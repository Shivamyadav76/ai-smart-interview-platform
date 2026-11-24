export const ROLES_META = [
  {
    id: 'HTML, CSS & JS',
    title: 'HTML, CSS & JavaScript',
    tag: 'Web Fundamentals • Easy to Mid',
    desc: 'Semantic HTML, tags, comments, CSS layout, box model, JS basics & DOM.',
  },
  {
    id: 'Frontend (React)',
    title: 'Frontend React Engineer',
    tag: 'Components • Props • Hooks • State',
    desc: 'JSX, useState, useEffect, event handling, controlled forms & UI logic.',
  },
  {
    id: 'MERN Stack',
    title: 'MERN Full-Stack Developer',
    tag: 'MongoDB • Express • React • Node',
    desc: 'Full-stack architecture, REST APIs, schema design & debugging.',
  },
  {
    id: 'Backend & APIs',
    title: 'Node.js & Backend Engineer',
    tag: 'Node • Express • HTTP • Databases',
    desc: 'Middleware, status codes, CRUD APIs, async errors & security.',
  },
  {
    id: 'HR & Behavioral',
    title: 'Behavioral & Career Readiness',
    tag: 'STAR Method • Ownership • Problem Solving',
    desc: 'Project walkthroughs, bug-fixing stories, teamwork & adaptability.',
  },
];

export const QUESTION_BANK = {
  'HTML, CSS & JS': [
    // --- HTML (Easy) ---
    {
      id: 101,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is the purpose of the <body> tag in an HTML document, and what content goes inside it?',
      keywords: ['body', 'visible', 'content', 'browser', 'elements'],
      hint: 'Think about what appears on the visible screen in the browser vs <head>.',
      modelAnswer:
        'The <body> tag holds all visible content rendered in the browser window, such as headings, paragraphs, images, links, forms, and scripts.',
    },
    {
      id: 102,
      type: 'theory',
      difficulty: 'Junior',
      question: 'How do you write a comment in HTML, and why are comments useful?',
      keywords: ['<!--', '-->', 'comment', 'notes', 'readable'],
      hint: 'HTML comments start with <!-- and end with -->.',
      modelAnswer:
        'HTML comments use <!-- comment text -->. The browser ignores them during rendering, and developers use them to document sections or temporarily disable markup.',
    },
    {
      id: 103,
      type: 'theory',
      difficulty: 'Junior',
      question: 'How do you create a hyperlink in HTML, and what does target="_blank" do?',
      keywords: ['<a>', 'href', 'link', 'blank', 'tab'],
      hint: 'Remember the anchor tag and its href attribute.',
      modelAnswer:
        'A hyperlink is created with <a href="url">Link Text</a>. Adding target="_blank" opens the linked page in a new browser tab.',
    },
    {
      id: 104,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which HTML element is best suited for the main navigation bar of a website?',
      options: ['<nav>', '<marquee>', '<hr>', '<br>'],
      correctOption: 0,
      keywords: ['nav', 'semantic'],
      hint: 'Look for the semantic landmark tag meant for navigation links.',
      modelAnswer:
        'The semantic <nav> tag represents a section of a page whose purpose is to provide navigation links.',
    },
    {
      id: 105,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which attribute on an <img> tag provides fallback text if the image fails to load?',
      options: ['title', 'alt', 'src', 'rel'],
      correctOption: 1,
      keywords: ['alt', 'accessibility'],
      hint: 'It also helps screen readers describe images.',
      modelAnswer:
        'The alt attribute provides alternative text when an image cannot be displayed and improves screen-reader accessibility.',
    },
    {
      id: 106,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is the difference between block-level and inline HTML elements? Give one example of each.',
      keywords: ['block', 'inline', 'width', 'line', 'div', 'span'],
      hint: 'Block elements start on a new line; inline elements sit in the flow.',
      modelAnswer:
        'Block elements (like <div> or <p>) start on a new line and take full available width by default. Inline elements (like <span> or <a>) only take as much width as needed and stay on the same line.',
    },
    {
      id: 107,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which input type in HTML creates a dropdown list of predefined options?',
      options: ['<select>', '<checkbox>', '<input type="list">', '<textarea>'],
      correctOption: 0,
      keywords: ['select', 'option'],
      hint: 'It pairs with child <option> tags.',
      modelAnswer:
        'The <select> element along with <option> tags creates a dropdown menu in HTML forms.',
    },

    // --- CSS (Easy to Mid) ---
    {
      id: 108,
      type: 'theory',
      difficulty: 'Junior',
      question: 'Explain the four layers of the CSS Box Model from inside out.',
      keywords: ['content', 'padding', 'border', 'margin', 'box'],
      hint: 'Inside content -> inner space -> outline -> outer space.',
      modelAnswer:
        'The CSS Box Model consists of Content (text/media), Padding (inner space inside border), Border (edge around padding), and Margin (outer space separating elements).',
    },
    {
      id: 109,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'What does "box-sizing: border-box" do to an element’s total width calculation?',
      options: [
        'Includes padding and border inside the specified width and height',
        'Removes margins completely',
        'Makes every element position: fixed',
        'Converts display: block into display: table',
      ],
      correctOption: 0,
      keywords: ['border-box', 'padding', 'border', 'width'],
      hint: 'No extra width surprises when you add padding.',
      modelAnswer:
        'With box-sizing: border-box, padding and border are included within the element’s width and height rather than added on top.',
    },
    {
      id: 110,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is the difference between Flexbox and CSS Grid for page layouts?',
      keywords: ['flexbox', 'grid', '1d', '2d', 'row', 'column'],
      hint: 'One-dimensional vs two-dimensional layout systems.',
      modelAnswer:
        'Flexbox is one-dimensional (primarily a row or a column at a time), while CSS Grid is two-dimensional (handles both rows and columns together).',
    },
    {
      id: 111,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which CSS property is used to change the text color of an element?',
      options: ['background-color', 'font-style', 'color', 'text-align'],
      correctOption: 2,
      keywords: ['color', 'text'],
      hint: 'Keep it simple—it is a single word.',
      modelAnswer: 'The color property sets the foreground text color of an element.',
    },
    {
      id: 112,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is the difference between class (.btn) and id (#submit-btn) selectors in CSS?',
      keywords: ['class', 'id', 'reusable', 'unique', 'specificity'],
      hint: 'Think about reusability on a page and selector specificity.',
      modelAnswer:
        'A class selector (.name) can be reused on multiple elements and has lower specificity than an ID selector (#name), which should uniquely identify one element per page.',
    },
    {
      id: 113,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which CSS position value positions an element relative to the browser viewport so it stays put while scrolling?',
      options: ['static', 'fixed', 'relative', 'baseline'],
      correctOption: 1,
      keywords: ['fixed', 'viewport', 'scroll'],
      hint: 'Often used for floating chat buttons or sticky bars.',
      modelAnswer:
        'position: fixed positions an element relative to the viewport so it remains in place when the user scrolls.',
    },

    // --- JavaScript (Easy to Mid) ---
    {
      id: 114,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'What is the difference between == and === in JavaScript?',
      options: [
        '=== checks both value and type without type coercion; == allows type coercion',
        '== is faster and only works on numbers',
        '=== converts strings into booleans automatically',
        'There is no difference in modern JavaScript',
      ],
      correctOption: 0,
      keywords: ['===', '==', 'type', 'coercion', 'strict'],
      hint: 'Strict equality avoids surprising type conversions like "5" == 5.',
      modelAnswer:
        '=== (strict equality) requires both value and data type to match, whereas == (loose equality) coerces types before comparing.',
    },
    {
      id: 115,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is the difference between let, const, and var in JavaScript?',
      keywords: ['let', 'const', 'var', 'block', 'scope', 'reassign'],
      hint: 'Compare scope (function vs block) and reassignment.',
      modelAnswer:
        'var is function-scoped and hoisted with undefined. let and const are block-scoped; let allows reassignment while const prevents reassigning the variable binding.',
    },
    {
      id: 116,
      type: 'code',
      difficulty: 'Junior',
      question: 'What will this snippet log, and why?',
      codeSnippet: `const nums = [1, 2, 3, 4];
const doubled = nums.map((n) => n * 2);
console.log(doubled);`,
      keywords: ['map', '2, 4, 6, 8', 'array', 'new'],
      hint: 'map() returns a new array with each item transformed.',
      modelAnswer:
        'It logs [2, 4, 6, 8]. Array.prototype.map() creates and returns a new array by applying the callback function to every element.',
    },
    {
      id: 117,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which array method filters elements that match a condition and returns a new array?',
      options: ['filter()', 'push()', 'pop()', 'join()'],
      correctOption: 0,
      keywords: ['filter', 'condition', 'array'],
      hint: 'It keeps elements where the callback returns truthy.',
      modelAnswer:
        'filter() returns a new array containing all elements that pass the test implemented by the provided function.',
    },
    {
      id: 118,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is a Promise in JavaScript, and what are its three states?',
      keywords: ['promise', 'pending', 'fulfilled', 'rejected', 'async'],
      hint: 'Think about asynchronous operations and their lifecycle states.',
      modelAnswer:
        'A Promise represents the eventual completion or failure of an asynchronous operation. Its three states are pending, fulfilled (resolved), and rejected.',
    },
    {
      id: 119,
      type: 'code',
      difficulty: 'Junior',
      question: 'Fix the bug in this event listener so clicking the button updates the heading text:',
      codeSnippet: `const btn = document.querySelector('#btn');
const title = document.querySelector('#title');

btn.addEventListener('click', () => {
  title.innerText = 'Button Clicked!';
});`,
      keywords: ['addeventlistener', 'click', 'innertext', 'dom'],
      hint: 'Check if #btn and #title exist in the DOM and whether the click handler updates text.',
      modelAnswer:
        'Ensure #btn and #title exist in the DOM when the script runs (e.g., defer script or place at end of body); the click listener properly updates title.innerText.',
    },
    {
      id: 120,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which method converts a JavaScript object into a JSON string?',
      options: ['JSON.stringify()', 'JSON.parse()', 'Object.keys()', 'Array.from()'],
      correctOption: 0,
      keywords: ['stringify', 'json', 'string'],
      hint: 'Useful when sending request bodies via fetch().',
      modelAnswer:
        'JSON.stringify() serializes a JavaScript value or object into a JSON-formatted string.',
    },
    {
      id: 121,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is hoisting in JavaScript?',
      keywords: ['hoisting', 'declaration', 'memory', 'scope', 'function'],
      hint: 'Think about how declarations are processed before code executes line-by-line.',
      modelAnswer:
        'Hoisting is JavaScript’s behavior of moving function and variable declarations to the top of their scope during the creation phase before execution.',
    },
  ],

  'Frontend (React)': [
    {
      id: 201,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is JSX in React, and why does a component return a single parent or Fragment?',
      keywords: ['jsx', 'element', 'fragment', 'parent', 'createelement'],
      hint: 'JSX compiles down to function calls returning a single root node.',
      modelAnswer:
        'JSX is a syntax extension for JavaScript that looks like HTML and compiles to React.createElement()/jsx calls. Returning a single root element or <>Fragment</> avoids extra wrapper nodes.',
    },
    {
      id: 202,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is the difference between props and state in React?',
      keywords: ['props', 'state', 'read-only', 'component', 'rerender'],
      hint: 'Props are passed in from parent; state is managed inside the component.',
      modelAnswer:
        'Props are read-only inputs passed from a parent component to a child, while state is mutable data managed within a component that triggers a re-render when updated.',
    },
    {
      id: 203,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Why is the "key" prop important when rendering a list with .map() in React?',
      options: [
        'It helps React identify which items changed, were added, or were removed',
        'It encrypts data in localStorage',
        'It automatically fetches API data',
        'It disables CSS transitions',
      ],
      correctOption: 0,
      keywords: ['key', 'list', 'reconciliation', 'identity'],
      hint: 'Think about list reconciliation and DOM updates.',
      modelAnswer:
        'Stable unique keys help React track item identity during reconciliation so it updates the DOM efficiently without mixing up list items.',
    },
    {
      id: 204,
      type: 'code',
      difficulty: 'Junior',
      question: 'How do you toggle a boolean "isOpen" state cleanly on button click?',
      codeSnippet: `const [isOpen, setIsOpen] = useState(false);

const handleToggle = () => {
  setIsOpen((prev) => !prev);
};`,
      keywords: ['usestate', 'prev', 'boolean', 'toggle'],
      hint: 'Using the previous state callback is safer than !isOpen directly.',
      modelAnswer:
        'Calling setIsOpen((prev) => !prev) reliably flips the boolean state based on the latest previous value.',
    },
    {
      id: 205,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'What does an empty dependency array [] in useEffect mean?',
      options: [
        'Run the effect once after the initial mount',
        'Run the effect on every single render',
        'Never run the effect at all',
        'Run only when window resizes',
      ],
      correctOption: 0,
      keywords: ['useeffect', 'mount', 'dependency', 'once'],
      hint: 'Great for one-time initial data loading.',
      modelAnswer:
        'An empty dependency array [] tells React to run the effect only once after the component mounts (and clean up on unmount).',
    },
    {
      id: 206,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is conditional rendering in React? Mention two ways to write it.',
      keywords: ['conditional', 'ternary', '&&', 'render'],
      hint: 'Ternary operator (? :) and logical AND (&&).',
      modelAnswer:
        'Conditional rendering shows or hides UI based on state/props. Common ways include the ternary operator (cond ? A : B) and logical AND (cond && <Component />).',
    },
    {
      id: 207,
      type: 'theory',
      difficulty: 'Mid',
      question: 'What is closure in JavaScript and where is it useful in React?',
      keywords: ['lexical', 'scope', 'function', 'state', 'event'],
      hint: 'Inner functions remembering outer lexical variables.',
      modelAnswer:
        'A closure gives a function access to variables from its outer lexical scope even after the outer function has returned, which is used in event handlers, timers, and hooks.',
    },
    {
      id: 208,
      type: 'theory',
      difficulty: 'Mid',
      question: 'Explain controlled vs. uncontrolled components in React.',
      keywords: ['state', 'ref', 'input', 'dom', 'value'],
      hint: 'React state drives value vs DOM/ref holds value.',
      modelAnswer:
        'Controlled components store form input values in React state (value + onChange), whereas uncontrolled components rely on the DOM and a ref to read values.',
    },
    {
      id: 209,
      type: 'code',
      difficulty: 'Mid',
      question: 'Why does clicking Increment 3 times fast only increase count by 1 here? Fix the handler:',
      codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleTriple = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleTriple}>{count}</button>;
}`,
      keywords: ['prev', 'functional', 'batch', 'stale', 'updater'],
      hint: 'React batches state updates within the same event handler.',
      modelAnswer:
        'React batches updates and count stays stale within the same render closure. Use setCount(prev => prev + 1) three times so each update reads the latest queued state.',
    },
    {
      id: 210,
      type: 'mcq',
      difficulty: 'Mid',
      question: 'When should you wrap a child component in React.memo()?',
      options: [
        'On every single component in the app by default',
        'When a pure component re-renders often with the exact same props and rendering is expensive',
        'To replace useEffect for API calls',
        'Only when using class components',
      ],
      correctOption: 1,
      keywords: ['memo', 'props', 'render'],
      hint: 'React.memo performs a shallow comparison of props.',
      modelAnswer:
        'React.memo skips re-rendering when props are shallowly equal, making it effective for expensive components that receive stable props.',
    },
  ],

  'MERN Stack': [
    {
      id: 301,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What does each letter in MERN stand for, and what is its main responsibility?',
      keywords: ['mongodb', 'express', 'react', 'node', 'fullstack'],
      hint: 'Database, backend framework, frontend library, runtime environment.',
      modelAnswer:
        'MERN stands for MongoDB (NoSQL database), Express.js (Node web framework), React (frontend UI library), and Node.js (JavaScript runtime on the server).',
    },
    {
      id: 302,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is CORS, and why do we use the cors package in an Express backend?',
      keywords: ['cors', 'origin', 'browser', 'express', 'header'],
      hint: 'Think about frontend on :5173 calling backend on :5000.',
      modelAnswer:
        'Cross-Origin Resource Sharing (CORS) is a browser security policy controlling cross-origin requests. Enabling cors in Express sets appropriate response headers so the React frontend can call the API.',
    },
    {
      id: 303,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which Mongoose method finds all documents matching a filter in MongoDB?',
      options: ['Model.find()', 'Model.insertMany()', 'Model.drop()', 'Model.connect()'],
      correctOption: 0,
      keywords: ['find', 'mongoose', 'query'],
      hint: 'Use findOne() for a single document and find() for multiple.',
      modelAnswer: 'Model.find(filter) queries the collection and returns matching documents.',
    },
    {
      id: 304,
      type: 'theory',
      difficulty: 'Junior',
      question: 'Why do we store secrets like MONGO_URI and JWT_SECRET inside a .env file?',
      keywords: ['env', 'environment', 'secret', 'git', 'config'],
      hint: 'Keep credentials out of source code and version control.',
      modelAnswer:
        '.env keeps environment-specific configuration and sensitive credentials out of source code and Git commits, loading them via process.env.',
    },
    {
      id: 305,
      type: 'theory',
      difficulty: 'Junior',
      question: 'What is the role of middleware in Express.js, and what happens if you forget to call next()?',
      keywords: ['middleware', 'request', 'response', 'next', 'hang'],
      hint: 'Think about the request-response lifecycle when neither res.send() nor next() is called.',
      modelAnswer:
        'Middleware functions access req, res, and next to run logic like auth or logging in the pipeline. If neither res.send() nor next() is called, the HTTP request hangs until the client times out.',
    },
    {
      id: 306,
      type: 'theory',
      difficulty: 'Mid',
      question: 'How does useEffect work in React, and why is the dependency array important?',
      keywords: ['side effect', 'render', 'dependency', 'cleanup', 'mount'],
      hint: 'Controls when side effects like API calls or listeners re-run.',
      modelAnswer:
        'useEffect runs side effects after render. The dependency array controls whether it runs on mount ([]), whenever specific values change ([a, b]), or after every render.',
    },
    {
      id: 307,
      type: 'theory',
      difficulty: 'Mid',
      question: 'When would you embed vs. reference documents in MongoDB?',
      keywords: ['schema', 'embed', 'reference', 'query', 'relationship'],
      hint: 'Consider read patterns, document size limits, and data duplication.',
      modelAnswer:
        'Embed data when sub-documents belong closely to one parent and are read together without unbounded growth; reference (ObjectId) when entities are queried independently or have many-to-many links.',
    },
    {
      id: 308,
      type: 'theory',
      difficulty: 'Mid',
      question: 'Explain how JWT authentication works in a MERN app and how you prevent XSS/CSRF token theft.',
      keywords: ['jwt', 'header', 'payload', 'httponly', 'cookie', 'secret'],
      hint: 'Mention where the token is stored (httpOnly cookie vs localStorage) and how middleware verifies it.',
      modelAnswer:
        'After login, the server signs a JWT with a secret key and sends it in an httpOnly, Secure cookie to mitigate XSS. On subsequent requests, an Express auth middleware verifies the signature and attaches decoded user data to req.user.',
    },
    {
      id: 309,
      type: 'code',
      difficulty: 'Mid',
      question: 'Find and fix the bug in this React useEffect data-fetching snippet causing an infinite loop:',
      codeSnippet: `function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  });

  return <div>{user?.name}</div>;
}`,
      keywords: ['dependency', 'array', 'userid', 'infinite', 'render'],
      hint: 'Look at the second argument of useEffect.',
      modelAnswer:
        'useEffect is missing its dependency array, so setUser triggers a re-render which runs useEffect again infinitely. Pass [userId] as the dependency array so it only runs when userId changes.',
    },
    {
      id: 310,
      type: 'mcq',
      difficulty: 'Senior',
      question: 'Your MongoDB orders collection has 50M+ documents and queries filtering by customerId and sorting by createdAt are slow. Best solution?',
      options: [
        'Add a compound index on { customerId: 1, createdAt: -1 }',
        'Convert createdAt from Date to String format',
        'Fetch all documents in Node.js and sort using Array.sort()',
        'Increase Express body-parser JSON limit',
      ],
      correctOption: 0,
      keywords: ['compound', 'index'],
      hint: 'Think about ESR (Equality, Sort, Range) indexing rule in MongoDB.',
      modelAnswer:
        'Creating a compound index on { customerId: 1, createdAt: -1 } allows MongoDB to filter by customerId and return pre-sorted results without an in-memory sort.',
    },
  ],

  'Backend & APIs': [
    {
      id: 401,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which HTTP method is standard for creating a new resource in a REST API?',
      options: ['POST', 'GET', 'HEAD', 'OPTIONS'],
      correctOption: 0,
      keywords: ['post', 'create', 'rest'],
      hint: 'GET reads data; POST creates a new record.',
      modelAnswer: 'POST is standard for submitting data to create a new resource on the server.',
    },
    {
      id: 402,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which HTTP status code indicates a resource was successfully created?',
      options: ['201 Created', '400 Bad Request', '404 Not Found', '500 Internal Server Error'],
      correctOption: 0,
      keywords: ['201', 'created', 'status'],
      hint: '2xx means success; 201 specifically signals creation.',
      modelAnswer: '201 Created indicates the request succeeded and resulted in a new resource being created.',
    },
    {
      id: 403,
      type: 'theory',
      difficulty: 'Junior',
      question: 'Why do we use express.json() middleware in an Express server?',
      keywords: ['json', 'req.body', 'middleware', 'parse'],
      hint: 'Without it, req.body can be undefined for JSON payloads.',
      modelAnswer:
        'express.json() parses incoming requests with JSON payloads and populates req.body so route handlers can read JSON data easily.',
    },
    {
      id: 404,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'Which HTTP status code should an API return when a user is authenticated, but lacks admin permission for the route?',
      options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '502 Bad Gateway'],
      correctOption: 1,
      keywords: ['403', 'forbidden'],
      hint: '401 is for missing/invalid identity; 403 is for insufficient permissions.',
      modelAnswer:
        '403 Forbidden indicates the server knows who the user is (authenticated), but their role lacks authorization for that resource.',
    },
    {
      id: 405,
      type: 'code',
      difficulty: 'Mid',
      question: 'Spot the security & error-handling flaw in this Express login route:',
      codeSnippet: `app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user.password === req.body.password) {
    res.json({ token: 'secret-token' });
  }
});`,
      keywords: ['try', 'catch', 'null', 'hash', 'bcrypt', '401'],
      hint: 'What happens if user is null, or password is stored in plain text?',
      modelAnswer:
        'First, there is no try/catch or null check on user (crashes if email is not found). Second, passwords must be hashed and compared with bcrypt.compare(), returning 401 on invalid credentials.',
    },
    {
      id: 406,
      type: 'theory',
      difficulty: 'Mid',
      question: 'What is the difference between PUT and PATCH in RESTful API design?',
      keywords: ['put', 'patch', 'replace', 'partial', 'idempotent'],
      hint: 'Compare full resource replacement vs partial field updates.',
      modelAnswer:
        'PUT replaces the entire resource with the request payload, whereas PATCH applies partial updates to specific fields without resending the whole object.',
    },
    {
      id: 407,
      type: 'theory',
      difficulty: 'Mid',
      question: 'How does async/await help write cleaner asynchronous code in Node.js?',
      keywords: ['async', 'await', 'promise', 'try', 'catch'],
      hint: 'Makes async flows read sequentially and works with try/catch.',
      modelAnswer:
        'async/await lets you write Promise-based asynchronous code in a sequential style and handle errors cleanly using standard try/catch blocks.',
    },
  ],

  'HR & Behavioral': [
    {
      id: 501,
      type: 'theory',
      difficulty: 'Junior',
      question: 'How would you introduce yourself in 60 seconds for a frontend or full-stack developer role?',
      keywords: ['projects', 'skills', 'react', 'node', 'learning'],
      hint: 'Highlight your core stack, hands-on projects, and what roles you are targeting.',
      modelAnswer:
        'Keep it concise: introduce your background and core stack (HTML, CSS, JavaScript, React, Node/MongoDB), share 1–2 practical projects you built end-to-end, and state your excitement for building clean, reliable web apps.',
    },
    {
      id: 502,
      type: 'theory',
      difficulty: 'Junior',
      question: 'When you get stuck on a bug or error in your code, what is your step-by-step approach?',
      keywords: ['error', 'logs', 'reproduce', 'search', 'isolate'],
      hint: 'Read the exact error message, reproduce consistently, isolate the cause, and test a fix.',
      modelAnswer:
        'First read the full error message and stack trace, reproduce the issue reliably, check recent changes/logs/network tab, isolate the failing piece, and verify the fix.',
    },
    {
      id: 503,
      type: 'theory',
      difficulty: 'Mid',
      question: 'Tell me about a tough bug you fixed in one of your full-stack projects. Use the STAR method.',
      keywords: ['situation', 'task', 'action', 'result', 'root cause'],
      hint: 'Structure your answer clearly: Situation -> Task -> Action -> measurable Result.',
      modelAnswer:
        'Describe the project context (Situation), what needed fixing (Task), how you isolated logs/network/DB queries to fix it (Action), and the final outcome or performance improvement (Result).',
    },
    {
      id: 504,
      type: 'mcq',
      difficulty: 'Junior',
      question: 'You realize 2 hours before a sprint demo that a feature has an edge-case crash. What is the most professional step?',
      options: [
        'Hide the bug during the demo and hope nobody notices',
        'Inform the team lead immediately, deploy a safe fallback/guard, and log a follow-up ticket',
        'Delete the entire feature branch right before the call',
        'Blame the API team during the live client demo',
      ],
      correctOption: 1,
      keywords: ['communicate', 'fallback'],
      hint: 'Proactive transparency + risk mitigation is always valued in engineering teams.',
      modelAnswer:
        'Communicating early with a concrete mitigation plan builds trust and prevents live demo failures.',
    },
    {
      id: 505,
      type: 'theory',
      difficulty: 'Junior',
      question: 'How do you keep learning new web technologies without getting overwhelmed?',
      keywords: ['practice', 'projects', 'fundamentals', 'consistent', 'build'],
      hint: 'Focus on strong fundamentals + building small real projects consistently.',
      modelAnswer:
        'Focus on core fundamentals first, follow structured resources, and reinforce every concept by building small practical features or projects rather than passive reading alone.',
    },
  ],
};