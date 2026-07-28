export interface PythonTopic {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly example: string;
}

const TOPICS = [
  ['tutorial', 'Python Tutorial', 'Python Tutorial'], ['what-is-python', 'What is Python', 'Python Tutorial'], ['python-features', 'Python Features', 'Python Tutorial'], ['advantages-of-python', 'Advantages of Python', 'Python Tutorial'], ['history-of-python', 'History of Python', 'Python Tutorial'], ['python-applications', 'Python Applications', 'Python Tutorial'], ['hello-world-program', 'Hello World Program in Python', 'Python Tutorial'], ['install-python', 'How to Install Python?', 'Python Tutorial'], ['python-syntax', 'Python Syntax', 'Python Tutorial'], ['python-keywords', 'Python Keywords', 'Python Tutorial'], ['python-literals', 'Python Literals', 'Python Tutorial'], ['python-operators', 'Python Operators', 'Python Tutorial'], ['python-comments', 'Python Comments', 'Python Tutorial'],
  ['python-variables', 'Python Variables', 'Python Variable & Data Type'], ['python-data-types', 'Python Data Types', 'Python Variable & Data Type'], ['python-numbers', 'Python Numbers', 'Python Variable & Data Type'], ['type-casting', 'Type Casting in Python', 'Python Variable & Data Type'], ['python-strings', 'Python Strings', 'Python Variable & Data Type'], ['python-string-methods', 'Python String Methods', 'Python Variable & Data Type'], ['python-boolean', 'Python Boolean', 'Python Variable & Data Type'],
  ['python-if-else', 'Python If else', 'Python Control Statements'], ['python-loops', 'Python Loops', 'Python Control Statements'], ['python-for-loop', 'Python For Loop', 'Python Control Statements'], ['python-while-loop', 'Python While Loop', 'Python Control Statements'], ['python-continue', 'Python Continue', 'Python Control Statements'], ['python-break-statement', 'Python Break Statement', 'Python Control Statements'], ['python-pass', 'Python Pass', 'Python Control Statements'], ['difference-between-break-and-continue-in-python', 'Difference between Break and Continue in Python', 'Python Control Statements'], ['difference-between-for-loop-and-while-loop-in-python', 'Difference Between For Loop and While Loop in Python', 'Python Control Statements'], ['control-statements-in-python', 'Control Statements in Python', 'Python Control Statements'], 
  ['python-data-structures', 'Python Data Structures', 'Python Data Structures'], ['python-lists', 'Python Lists', 'Python Data Structures'], ['python-list-methods', 'Python List Methods', 'Python Data Structures'], ['python-tuples', 'Python Tuples', 'Python Data Structures'], ['python-tuple-methods', 'Python Tuple Methods', 'Python Data Structures'], ['list-vs-tuple', 'Difference between List and Tuple', 'Python Data Structures'], ['python-sets', 'Python Sets', 'Python Data Structures'], ['python-set-methods', 'Python Set Methods', 'Python Data Structures'], ['python-dictionary', 'Python Dictionary', 'Python Data Structures'], ['python-dictionary-methods', 'Python Dictionary Methods', 'Python Data Structures'], ['list-vs-dictionary', 'Difference between List and Dictionary in Python', 'Python Data Structures'], ['list-set-tuple-dictionary', 'Difference between List, Set, Tuple, and Dictionary in Python', 'Python Data Structures'], ['set-vs-dictionary', 'Difference between Set and Dictionary in Python', 'Python Data Structures'],
  ['python-functions', 'Python Functions', 'Python Functions'], ['python-built-in-functions', 'Python Built-in Functions', 'Python Functions'], ['python-lambda-functions', 'Python Lambda Functions', 'Python Functions'], ['def-function', 'def Function in Python', 'Python Functions'],
  ['python-modules', 'Python Modules', 'Python Modules'], ['python-list-comprehension', 'Python List Comprehension', 'Python Modules'], ['python-collection-module', 'Python Collection Module', 'Python Modules'], ['python-math-module', 'Python Math Module', 'Python Modules'], ['python-os-module', 'Python OS Module', 'Python Modules'], ['python-random-module', 'Python Random Module', 'Python Modules'], ['python-statistics-module', 'Python Statistics Module', 'Python Modules'], ['python-sys-module', 'Python Sys Module', 'Python Modules'],
  ['python-oops', 'Python OOPs', 'Python OOPs'], ['python-oops-concepts', 'Python OOPs Concepts', 'Python OOPs'], ['classes-and-objects', 'Python Classes and Objects', 'Python OOPs'], ['python-constructors', 'Python Constructors', 'Python OOPs'], ['python-inheritance', 'Python Inheritance', 'Python OOPs'], ['python-abstraction', 'Abstraction in Python', 'Python OOPs'], ['python-encapsulation', 'Encapsulation in Python', 'Python OOPs'], ['python-access-modifiers', 'Access Modifiers in Python', 'Python OOPs'], ['python-method-overloading', 'Method Overloading in Python', 'Python OOPs'],
  ['python-exception-handling', 'Python Exception Handling', 'Python Exception Handling'], ['exception-handling', 'Exception Handling in Python', 'Python Exception Handling'], ['catch-multiple-exceptions', 'How to Catch Multiple Exceptions in Python?', 'Python Exception Handling'], ['python-raise-exception', 'Python Raise an Exception', 'Python Exception Handling'], ['finally-keyword', 'Finally Keyword in Python', 'Python Exception Handling'], ['python-built-in-exceptions', 'Python Built-in Exceptions', 'Python Exception Handling'],
  ['python-file-handling', 'Python File Handling', 'Python File Handling'], ['read-csv-file', 'Python Read CSV File', 'Python File Handling'], ['write-csv-file', 'Python Write CSV File', 'Python File Handling'], ['read-excel-file', 'Read Excel File', 'Python File Handling'], ['write-excel-file', 'Write Excel File', 'Python File Handling'], ['python-json', 'Python JSON', 'Python File Handling'], ['context-manager', 'Context Manager in Python', 'Python File Handling']
] as const;

const EXAMPLES: Record<string, string> = {
  tutorial: "print('Hello, Python!')",
  'what-is-python': "message = 'Python is readable and versatile'\nprint(message)",
  'python-variables': "name = 'Asha'\nage = 8\nprint(name, age)",
  'python-data-types': "count = 10\nprice = 19.95\nactive = True\nprint(type(count), type(price), type(active))",
  'python-if-else': "score = 75\nif score >= 50:\n    print('Pass')\nelse:\n    print('Try again')",
  'python-for-loop': "for number in range(1, 4):\n    print(number)",
  'python-lists': "languages = ['Python', 'Java']\nlanguages.append('SQL')\nprint(languages)",
  'python-dictionary': "student = {'name': 'Asha', 'experience': 8}\nprint(student['name'])",
  'python-functions': "def greet(name):\n    return f'Hello, {name}'\n\nprint(greet('Asha'))",
  'python-lambda-functions': "double = lambda value: value * 2\nprint(double(5))",
  'python-list-comprehension': "squares = [number * number for number in range(5)]\nprint(squares)",
  'classes-and-objects': "class User:\n    def __init__(self, name):\n        self.name = name\n\nuser = User('Asha')\nprint(user.name)",
  'python-inheritance': "class Admin(User):\n    pass",
  'exception-handling': "try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')",
  'python-file-handling': "with open('notes.txt', 'w', encoding='utf-8') as file:\n    file.write('Learn Python')",
  'python-json': "import json\ndata = json.dumps({'language': 'Python'})\nprint(data)",
  'context-manager': "with open('notes.txt', encoding='utf-8') as file:\n    content = file.read()"
};

export const PYTHON_TOPICS: readonly PythonTopic[] = TOPICS.map(([slug, title, category]) => ({
  slug, title, category,
  description: slug === 'what-is-python'
    ? 'Understand what Python is, how it started, why developers use it, its advantages and limitations, and its real-world applications.'
    : slug === 'python-comments'
      ? 'Learn Python comments, inline comments, multiline notes, docstrings, comment best practices, and how documentation is stored at runtime.'
      : slug === 'python-operators'
      ? 'Learn Python operators with clear tables and examples for arithmetic, comparison, assignment, logical, bitwise, membership, identity, and precedence rules.'
      : slug === 'python-literals'
      ? 'Learn Python literals with clear tables and examples for numbers, strings, Booleans, collections, None, escape sequences, and mutability.'
      : slug === 'python-keywords'
      ? 'Learn Python keywords with beginner-friendly tables and examples for conditions, loops, functions, exceptions, imports, scope, asynchronous code, and pattern matching.'
      : slug === 'python-syntax'
      ? 'Learn Python syntax, interactive and script modes, variables, indentation, identifiers, keywords, comments, multiline statements, and user input.'
      : slug === 'hello-world-program'
      ? 'Write and run your first Python Hello World program, understand print(), comments, strings, indentation, functions, and common beginner mistakes.'
      : slug === 'python-applications'
      ? 'Explore real-world Python applications in web development, data science, automation, AI, machine learning, games, networking, cybersecurity, and analytics.'
      : slug === 'history-of-python'
      ? 'Learn the history of Python, who created it, why it was named Python, how Python 1, 2, and 3 evolved, and why Python 3 is used today.'
      : slug === 'advantages-of-python'
      ? 'Explore the advantages of Python, including readable syntax, rapid development, portability, libraries, community support, flexibility, and practical trade-offs.'
      : slug === 'python-features'
      ? 'Learn the most important features of Python, including readable syntax, dynamic typing, portability, libraries, object-oriented programming, memory management, and concurrency.'
      : `Learn ${title} with clear explanations, Python examples, and practical programming guidance.`,
  example: EXAMPLES[slug] ?? `# ${title}\nprint('Practice ${title} with a small Python example')`
}));
