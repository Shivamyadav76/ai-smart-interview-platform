import { useEffect, useMemo, useState } from 'react';
import { QUESTION_BANK, ROLES_META } from './data/questions';
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/interview';
const QUESTION_DURATION = 120;

export default function App() {
  const [activeView, setActiveView] = useState('setup'); // 'setup' | 'studio' | 'report' | 'history'
  const [selectedRole, setSelectedRole] = useState(ROLES_META[0].id);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selectedMcq, setSelectedMcq] = useState(null);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [sessionAnswers, setSessionAnswers] = useState([]);
  const [lastCompletedReport, setLastCompletedReport] = useState(null);

  const [history, setHistory] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);
  const [showHint, setShowHint] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const filteredQuestions = useMemo(() => {
    const base = QUESTION_BANK[selectedRole] || [];
    const matched = base.filter((q) => {
      const diffOk = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      const typeOk = typeFilter === 'All' || q.type === typeFilter;
      return diffOk && typeOk;
    });
    return matched.length > 0 ? matched : base;
  }, [selectedRole, difficultyFilter, typeFilter]);

  const activeQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  const loadHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/sessions`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (activeView !== 'studio' || currentFeedback || timeLeft <= 0) return;
    const id = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [activeView, currentFeedback, timeLeft]);

  const startInterview = () => {
    setCurrentIndex(0);
    setAnswer('');
    setSelectedMcq(null);
    setCurrentFeedback(null);
    setSessionAnswers([]);
    setShowHint(false);
    setShowModel(false);
    setTimeLeft(QUESTION_DURATION);
    setActiveView('studio');
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input works best in Google Chrome or Microsoft Edge.');
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = 'en-IN';
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e) => {
      const spoken = e.results[0][0].transcript;
      setAnswer((prev) => (prev ? `${prev} ${spoken}` : spoken));
    };
    rec.start();
  };

  const handleEvaluate = async (e) => {
    e.preventDefault();
    const effectiveAnswer =
      activeQuestion.type === 'mcq'
        ? selectedMcq !== null
          ? activeQuestion.options[selectedMcq]
          : ''
        : answer;

    if (!effectiveAnswer.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: activeQuestion.question,
          expectedKeywords: activeQuestion.keywords,
          userAnswer: effectiveAnswer,
        }),
      });
      const data = await res.json();

      let finalScore = data.score;
      let finalFeedback = data.feedback;

      if (activeQuestion.type === 'mcq') {
        const isRight = selectedMcq === activeQuestion.correctOption;
        finalScore = isRight ? 10 : 3;
        finalFeedback = isRight
          ? 'Spot on! You selected the optimal production answer.'
          : `Not quite. Recommended choice: "${activeQuestion.options[activeQuestion.correctOption]}".`;
      }

      const enriched = {
        question: activeQuestion.question,
        type: activeQuestion.type,
        difficulty: activeQuestion.difficulty,
        userAnswer: effectiveAnswer,
        score: finalScore,
        feedback: finalFeedback,
        keywords: activeQuestion.keywords || [],
        modelAnswer: activeQuestion.modelAnswer,
      };

      setCurrentFeedback(enriched);
      setSessionAnswers((prev) => [...prev, enriched]);
    } catch (err) {
      console.error('Evaluation error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextOrFinish = async () => {
    setAnswer('');
    setSelectedMcq(null);
    setCurrentFeedback(null);
    setShowHint(false);
    setShowModel(false);
    setTimeLeft(QUESTION_DURATION);

    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    const totalScore = sessionAnswers.reduce((sum, item) => sum + item.score, 0);
    const maxScore = filteredQuestions.length * 10;

    const payload = {
      role: selectedRole,
      answers: sessionAnswers.map(({ question, userAnswer, score, feedback }) => ({
        question,
        userAnswer,
        score,
        feedback,
      })),
      totalScore,
      maxScore,
    };

    try {
      await fetch(`${API_BASE}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      await loadHistory();
    } catch (err) {
      console.error('Session save error:', err);
    }

    setLastCompletedReport({
      role: selectedRole,
      totalScore,
      maxScore,
      items: sessionAnswers,
      createdAt: new Date().toISOString(),
    });
    setActiveView('report');
  };

  const avgAccuracy = useMemo(() => {
    if (!history.length) return 0;
    const sum = history.reduce((acc, s) => acc + s.totalScore / s.maxScore, 0);
    return Math.round((sum / history.length) * 100);
  }, [history]);

  const bestScorePct = useMemo(() => {
    if (!history.length) return 0;
    return Math.max(...history.map((s) => Math.round((s.totalScore / s.maxScore) * 100)));
  }, [history]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  return (
    <div className="studio-shell">
      <aside className="sidebar">
        <div>
          <div className="brand-box">
            <span className="brand-pill">AI Interview Studio</span>
            <h1>PrepPulse AI</h1>
            <p>Technical &amp; Behavioral Mock Platform</p>
          </div>

          <div className="nav-group">
            <button
              className={`nav-item ${activeView === 'setup' ? 'active' : ''}`}
              onClick={() => setActiveView('setup')}
            >
              <span>Interview Setup</span>
            </button>
            <button
              className={`nav-item ${activeView === 'studio' ? 'active' : ''}`}
              onClick={() => setActiveView('studio')}
            >
              <span>Live Studio</span>
              <span className="nav-count">{filteredQuestions.length}Q</span>
            </button>
            <button
              className={`nav-item ${activeView === 'report' ? 'active' : ''}`}
              onClick={() => setActiveView('report')}
            >
              <span>Report Card</span>
            </button>
            <button
              className={`nav-item ${activeView === 'history' ? 'active' : ''}`}
              onClick={() => setActiveView('history')}
            >
              <span>Session History</span>
              <span className="nav-count">{history.length}</span>
            </button>
          </div>
        </div>

        <div className="sidebar-footer">
          <strong>Candidate Workspace</strong>
          <span>Target: {selectedRole}</span>
        </div>
      </aside>

      <main className="content-area">
        <div className="kpi-row">
          <div className="kpi-card">
            <div className="kpi-label">Completed Sessions</div>
            <div className="kpi-value">{history.length}</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Average Score</div>
            <div className="kpi-value">{avgAccuracy}%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Personal Best</div>
            <div className="kpi-value">{bestScorePct}%</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Active Track</div>
            <div className="kpi-value" style={{ fontSize: 16, marginTop: 8 }}>
              {selectedRole}
            </div>
          </div>
        </div>

        {activeView === 'setup' && (
          <>
            <div className="page-header">
              <div>
                <h2>Configure Mock Interview</h2>
                <p>Choose your target engineering track, difficulty, and question format.</p>
              </div>
              <button className="btn-primary" onClick={startInterview}>
                Start Mock Interview →
              </button>
            </div>

            <div className="role-grid">
              {ROLES_META.map((r) => (
                <div
                  key={r.id}
                  className={`role-card ${selectedRole === r.id ? 'selected' : ''}`}
                  onClick={() => setSelectedRole(r.id)}
                >
                  <div className="role-tag">{r.tag}</div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>

            <div className="config-bar">
              <div>
                <div className="kpi-label" style={{ marginBottom: 6 }}>
                  Difficulty Level
                </div>
                <div className="filter-pills">
                  {['All', 'Junior', 'Mid', 'Senior'].map((lvl) => (
                    <button
                      key={lvl}
                      className={`pill-btn ${difficultyFilter === lvl ? 'active' : ''}`}
                      onClick={() => setDifficultyFilter(lvl)}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="kpi-label" style={{ marginBottom: 6 }}>
                  Question Format
                </div>
                <div className="filter-pills">
                  {[
                    ['All', 'All Types'],
                    ['theory', 'Theory & Voice'],
                    ['code', 'Code Debugging'],
                    ['mcq', 'Scenario MCQ'],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      className={`pill-btn ${typeFilter === val ? 'active' : ''}`}
                      onClick={() => setTypeFilter(val)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeView === 'studio' && activeQuestion && (
          <>
            <div className="page-header">
              <div>
                <h2>Live Interview Studio</h2>
                <p>
                  {selectedRole} &bull; Question {currentIndex + 1} of {filteredQuestions.length}
                </p>
              </div>
              <button className="btn-ghost" onClick={() => setActiveView('setup')}>
                Change Track
              </button>
            </div>

            <div className="studio-grid">
              <section className="panel">
                <div className="q-topbar">
                  <div className="badge-row">
                    <span className="type-badge">{activeQuestion.type}</span>
                    <span className="diff-badge">{activeQuestion.difficulty}</span>
                  </div>
                  <span className={`timer-pill ${timeLeft <= 20 ? 'urgent' : ''}`}>
                    {formatTimer(timeLeft)}
                  </span>
                </div>

                <div className="progress-bar">
                  <div
                    style={{
                      width: `${
                        ((currentIndex + (currentFeedback ? 1 : 0)) / filteredQuestions.length) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <h3 className="q-prompt">{activeQuestion.question}</h3>

                {activeQuestion.codeSnippet && (
                  <pre className="code-block">
                    <code>{activeQuestion.codeSnippet}</code>
                  </pre>
                )}

                <form onSubmit={handleEvaluate}>
                  {activeQuestion.type === 'mcq' ? (
                    <div className="mcq-list">
                      {activeQuestion.options.map((opt, idx) => (
                        <button
                          type="button"
                          key={opt}
                          disabled={Boolean(currentFeedback)}
                          className={`mcq-option ${selectedMcq === idx ? 'chosen' : ''}`}
                          onClick={() => setSelectedMcq(idx)}
                        >
                          <strong>{String.fromCharCode(65 + idx)}.</strong>
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      rows={5}
                      className="answer-textarea"
                      placeholder={
                        activeQuestion.type === 'code'
                          ? 'Explain the bug and write the corrected code or fix...'
                          : 'Write your structured answer or click Speak Answer...'
                      }
                      value={answer}
                      disabled={Boolean(currentFeedback)}
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                  )}

                  <div className="action-row">
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {activeQuestion.type === 'mcq'
                        ? 'Select one option to evaluate'
                        : `${wordCount} words`}
                    </span>

                    <div style={{ display: 'flex', gap: 8 }}>
                      {activeQuestion.type !== 'mcq' && (
                        <button
                          type="button"
                          className={`btn-ghost ${isListening ? 'active-mic' : ''}`}
                          disabled={Boolean(currentFeedback)}
                          onClick={handleVoiceInput}
                        >
                          {isListening ? 'Listening...' : 'Speak Answer'}
                        </button>
                      )}
                      <button
                        type="submit"
                        className="btn-primary"
                        disabled={
                          submitting ||
                          Boolean(currentFeedback) ||
                          (activeQuestion.type === 'mcq' ? selectedMcq === null : !answer.trim())
                        }
                      >
                        {submitting ? 'Evaluating...' : 'Submit & Evaluate'}
                      </button>
                    </div>
                  </div>
                </form>

                {currentFeedback && (
                  <div className="eval-box">
                    <div className="eval-top">
                      <strong>AI Evaluator Feedback</strong>
                      <span
                        className={`score-pill ${currentFeedback.score >= 7 ? 'good' : 'avg'}`}
                      >
                        {currentFeedback.score} / 10
                      </span>
                    </div>
                    <p style={{ fontSize: 14, color: '#cbd5e1' }}>{currentFeedback.feedback}</p>

                    {currentFeedback.keywords?.length > 0 && (
                      <div className="kw-chips">
                        {currentFeedback.keywords.map((kw) => {
                          const hit = currentFeedback.userAnswer
                            .toLowerCase()
                            .includes(kw.toLowerCase());
                          return (
                            <span key={kw} className={`kw-chip ${hit ? 'hit' : 'miss'}`}>
                              {hit ? '✓' : '•'} {kw}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <button className="btn-primary" onClick={handleNextOrFinish}>
                        {currentIndex + 1 < filteredQuestions.length
                          ? 'Next Question →'
                          : 'Finish & Save Session'}
                      </button>
                      <button
                        type="button"
                        className="btn-ghost"
                        onClick={() => setShowModel((prev) => !prev)}
                      >
                        {showModel ? 'Hide Ideal Answer' : 'View Ideal Answer'}
                      </button>
                    </div>

                    {showModel && (
                      <div className="model-box" style={{ marginTop: 12 }}>
                        <strong>Model Answer:</strong> {currentFeedback.modelAnswer}
                      </div>
                    )}
                  </div>
                )}
              </section>

              <aside className="panel">
                <div className="interviewer-card">
                  <div className="avatar-orb">AI</div>
                  <div>
                    <strong style={{ fontSize: 14 }}>Alex &bull; Technical Lead</strong>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      Live Evaluation Mode Active
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-ghost"
                  style={{ width: '100%' }}
                  onClick={() => setShowHint((prev) => !prev)}
                >
                  {showHint ? 'Hide Hint' : 'Need a Hint?'}
                </button>

                {showHint && <div className="hint-box">{activeQuestion.hint}</div>}

                <div className="q-queue">
                  <div className="kpi-label" style={{ marginTop: 6 }}>
                    Session Question Queue
                  </div>
                  {filteredQuestions.map((q, idx) => (
                    <div
                      key={q.id}
                      className={`q-step ${idx === currentIndex ? 'current' : ''}`}
                    >
                      <span>
                        Q{idx + 1}. {q.type.toUpperCase()}
                      </span>
                      <span>
                        {sessionAnswers[idx] ? `${sessionAnswers[idx].score}/10` : q.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </>
        )}

        {activeView === 'report' && (
          <>
            <div className="page-header">
              <div>
                <h2>Detailed Performance Report</h2>
                <p>Question-by-question breakdown and model solutions.</p>
              </div>
              <button className="btn-primary" onClick={startInterview}>
                Run Another Mock
              </button>
            </div>

            {!lastCompletedReport ? (
              <div className="panel">
                <p style={{ color: 'var(--text-secondary)' }}>
                  Complete a mock interview session in Live Studio to view your detailed report
                  card here.
                </p>
              </div>
            ) : (
              <div className="report-list">
                <div className="panel">
                  <strong>{lastCompletedReport.role}</strong> &mdash; Total Score:{' '}
                  <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>
                    {lastCompletedReport.totalScore} / {lastCompletedReport.maxScore}
                  </span>
                </div>

                {lastCompletedReport.items.map((item, idx) => (
                  <div key={idx} className="report-item">
                    <div className="eval-top">
                      <strong>
                        Q{idx + 1}: {item.question}
                      </strong>
                      <span className={`score-pill ${item.score >= 7 ? 'good' : 'avg'}`}>
                        {item.score}/10
                      </span>
                    </div>
                    <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', margin: '8px 0' }}>
                      <strong>Your Response:</strong> {item.userAnswer}
                    </p>
                    <p style={{ fontSize: 13.5, color: '#cbd5e1', marginBottom: 8 }}>
                      <strong>Feedback:</strong> {item.feedback}
                    </p>
                    {item.modelAnswer && (
                      <div className="model-box">
                        <strong>Ideal Answer:</strong> {item.modelAnswer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeView === 'history' && (
          <>
            <div className="page-header">
              <div>
                <h2>Saved Interview Sessions</h2>
                <p>Synced with your MongoDB Atlas database.</p>
              </div>
              <button className="btn-ghost" onClick={loadHistory}>
                Refresh History
              </button>
            </div>

            {history.length === 0 ? (
              <div className="panel">
                <p style={{ color: 'var(--text-secondary)' }}>
                  No saved sessions found yet. Finish a session to store your results.
                </p>
              </div>
            ) : (
              <div className="history-grid">
                {history.map((s) => {
                  const pct = Math.round((s.totalScore / s.maxScore) * 100);
                  return (
                    <div key={s._id} className="session-card">
                      <div>
                        <strong style={{ fontSize: 15 }}>{s.role}</strong>
                        <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
                          {s.answers?.length || 0} questions answered &bull;{' '}
                          {s.createdAt ? new Date(s.createdAt).toLocaleString('en-IN') : 'Saved'}
                        </div>
                      </div>
                      <span className={`score-pill ${pct >= 70 ? 'good' : 'avg'}`}>
                        {s.totalScore}/{s.maxScore} ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}