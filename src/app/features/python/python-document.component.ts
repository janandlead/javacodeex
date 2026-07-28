import { AfterViewInit, Component, ElementRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PYTHON_TOPICS, PythonTopic } from '../../core/constants/python-topics';
import { appendFurtherReading } from '../../shared/tutorial-further-reading';

const PYTHON_LESSONS = PYTHON_TOPICS.filter((item) => item.slug !== 'tutorial');

@Component({
  selector: 'app-python-document',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (topic) {
      <article class="container-xl course-document python-document-page py-4">
        <header class="mb-4">
          <p class="eyebrow">{{ topic.category }}</p>
          <h1>{{ topic.title }}</h1>
          <p class="lead">{{ topic.description }}</p>
        </header>

        <div class="document-body python-document-body">
          @if (topic.slug === 'what-is-python') {
          <h2>What is Python?</h2>
          <p>Python is a high-level, general-purpose programming language designed to make code easy to read and write. It is dynamically typed, open source, and supports procedural, object-oriented, and functional programming.</p>
          <p>Python programs are usually run by an interpreter. Python implementations first compile source code into an internal bytecode representation and then execute it through the Python runtime. This is why calling Python simply “compiled” or “interpreted” is incomplete; the exact execution process depends on the implementation.</p>

          <h2>Why is Python popular?</h2>
          <p>Python combines a small amount of readable syntax with a large standard library and a broad package ecosystem. Beginners can create useful programs quickly, while experienced developers can use the same language for automation, APIs, data processing, testing, and research.</p>
          <ul>
            <li>Indentation makes the structure of a program visible.</li>
            <li>Dynamic typing lets developers work without declaring a type for every variable.</li>
            <li>Built-in collections such as lists, tuples, sets, and dictionaries solve common data problems.</li>
            <li>Modules and packages help teams organize and reuse code.</li>
            <li>Python runs on Windows, macOS, Linux, and other supported platforms.</li>
          </ul>

          <h2>History of Python</h2>
          <p>Guido van Rossum began developing Python in the late 1980s while working at the Centrum Wiskunde &amp; Informatica in the Netherlands. The first public Python release appeared in 1991. The language was designed to be readable, extensible, and practical for everyday programming.</p>
          <p>Python 1.0 arrived in 1994, Python 2.0 was released in 2000, and Python 3.0 was released in 2008. Python 3 introduced important improvements and is the modern version line used for new applications. Python 2 reached its end of life in 2020, so new projects should use Python 3.</p>

          <h2>Python syntax example</h2>
          <p>The following program prints a message. Python uses indentation instead of braces to group statements:</p>
          <pre><code>message = "Hello, Python!"
print(message)</code></pre>
          <p>Save the code as <code>hello.py</code> and run it from a terminal with <code>python hello.py</code> or the Python command configured on your system.</p>

          <h2>Advantages of Python</h2>
          <ul>
            <li><strong>Easy to learn:</strong> The syntax is concise and readable.</li>
            <li><strong>Fast development:</strong> Built-in features and reusable packages reduce boilerplate.</li>
            <li><strong>Flexible:</strong> Python supports scripts, web services, desktop tools, data workflows, and automation.</li>
            <li><strong>Strong community:</strong> Documentation, learning resources, and open-source packages are widely available.</li>
            <li><strong>Good integration:</strong> Python can work with databases, HTTP services, operating-system tools, and code written in other languages.</li>
          </ul>

          <h2>Limitations of Python</h2>
          <p>Python is not the best choice for every workload. Its dynamic nature can allow some errors to appear at runtime, and its general-purpose interpreter is usually slower than native compiled languages for CPU-intensive tasks. Python applications may also use more memory than a small program written in a lower-level language.</p>
          <p>These trade-offs can often be managed with profiling, caching, efficient data structures, compiled extensions, background workers, or a language better suited to a performance-critical component.</p>

          <h2>Where is Python used?</h2>
          <h3>Data analysis and visualization</h3>
          <p>Libraries such as NumPy, pandas, Matplotlib, and Seaborn help developers clean data, calculate statistics, identify patterns, and present results using charts.</p>
          <h3>Machine learning and artificial intelligence</h3>
          <p>Python is widely used for machine learning experiments and AI applications. Tools such as scikit-learn, PyTorch, and TensorFlow support model training, evaluation, and deployment workflows.</p>
          <h3>Web development and APIs</h3>
          <p>Django and Flask provide web-development features, while FastAPI is commonly used to build modern APIs. Python web applications can connect to databases, authenticate users, and communicate with other services.</p>
          <h3>Automation, scripting, and web scraping</h3>
          <p>Python can automate file operations, reports, scheduled tasks, and system workflows. Requests can make HTTP calls, and Beautiful Soup can help parse HTML when data collection is permitted and complies with a website’s rules.</p>
          <h3>Testing and software tools</h3>
          <p>Python is useful for test automation, command-line tools, prototypes, and developer utilities. pytest is a popular framework for writing maintainable automated tests.</p>
          <h3>Games and desktop applications</h3>
          <p>Pygame supports beginner-friendly 2D game projects, while Tkinter and Qt-based tools can be used to build desktop interfaces.</p>

          <h2>Conclusion</h2>
          <p>Python is a readable and versatile language with applications across software development, data, automation, and education. Learn the fundamentals first, then practice by building small programs with functions, collections, modules, and files.</p>
          } @else if (topic.slug === 'python-variables') {
          <h2>What is a variable in Python?</h2>
          <p>A variable is a name that refers to an object in a Python program. Variables let you store values, use those values in expressions, and assign a different object later. Python determines the type at runtime, so you do not write a type declaration before the variable name.</p>

          <h2>Creating variables</h2>
          <p>Use the assignment operator (<code>=</code>) to bind a name to a value:</p>
          <pre><code>age = 17
name = "Daisy"

print(age)
print(name)</code></pre>
          <div class="output-box">17<br>Daisy</div>
          <p>In this example, <code>age</code> refers to an integer and <code>name</code> refers to a string. Python infers these types from the assigned values.</p>

          <h2>Variable naming rules</h2>
          <p>Variable names must follow Python's identifier rules. Good names also make a program easier to understand:</p>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Rule</th><th>Valid example</th><th>Invalid example</th></tr></thead>
              <tbody>
                <tr><td>Use letters, digits, and underscores</td><td><code>student_2</code></td><td><code>student-name</code></td></tr>
                <tr><td>Do not start with a digit</td><td><code>score1</code></td><td><code>1score</code></td></tr>
                <tr><td>Do not include spaces</td><td><code>first_name</code></td><td><code>first name</code></td></tr>
                <tr><td>Names are case-sensitive</td><td><code>total</code>, <code>Total</code></td><td>They are not the same variable</td></tr>
                <tr><td>Do not use reserved keywords</td><td><code>class_name</code></td><td><code>class</code></td></tr>
              </tbody>
            </table>
          </div>
          <p>Use <code>snake_case</code> for variables and functions, choose descriptive names, and avoid names such as <code>x</code> when a clearer name such as <code>total_price</code> is possible.</p>

          <h2>Dynamic typing</h2>
          <p>Python is dynamically typed. A name can refer to objects of different types at different points in a program:</p>
          <pre><code>value = 21
print(value, type(value))

value = "Python"
print(value, type(value))</code></pre>
          <div class="output-box">21 &lt;class 'int'&gt;<br>Python &lt;class 'str'&gt;</div>
          <p>The name <code>value</code> was first bound to an integer and was later rebound to a string. The object has a type; the variable name itself does not have a permanently fixed type.</p>

          <h2>Assigning multiple values</h2>
          <p>Python supports assigning one value to several names and unpacking several values in one statement:</p>
          <pre><code># The same object is assigned to three names
first = second = third = 182

# Each name receives the corresponding value
student, course, score = "Asha", "Python", 19.5

print(first, second, third)
print(student, course, score)</code></pre>
          <p>When unpacking, the number of names must normally match the number of values. This makes the relationship between the data and the variables explicit.</p>

          <h2>Changing a variable and type conversion</h2>
          <p>Some operations return a new type. Division with <code>/</code> returns a floating-point value, while functions such as <code>int()</code>, <code>float()</code>, and <code>str()</code> can perform explicit conversions:</p>
          <pre><code>number = 9
quotient = number / 4
whole_number = int(quotient)

print(quotient)
print(whole_number)</code></pre>
          <div class="output-box">2.25<br>2</div>
          <p>Conversion is not always lossless. For example, converting <code>2.25</code> to <code>int</code> removes the fractional part. Validate user input before converting it in a real application.</p>

          <h2>Checking a variable's type</h2>
          <p>The built-in <code>type()</code> function returns the type of an object. Use it while learning or debugging; in application logic, prefer clear behavior and appropriate validation:</p>
          <pre><code>count = 18
price = 82.6
language = "Python"
active = True
items = [4, 1, 8]

print(type(count))
print(type(price))
print(type(language))
print(type(active))
print(type(items))</code></pre>

          <h2>Local and global scope</h2>
          <p>Scope describes where a name can be accessed. A name created inside a function is local to that function. A name created outside functions is global to the module, although using global state extensively can make programs harder to test:</p>
          <pre><code>tax_rate = 0.18  # global name

def calculate_tax(amount):
    tax = amount * tax_rate  # local name: available only in this function
    return tax

print(calculate_tax(100))
# print(tax)  # NameError: tax is local to calculate_tax()</code></pre>
          <p>Python resolves names through nested scopes. Prefer passing values into functions and returning results instead of changing global variables.</p>

          <h2>Variables are references to objects</h2>
          <p>A variable does not contain a separate copy of a value in the way beginners often imagine. It is a reference to an object. Assigning another name creates another reference to the same object:</p>
          <pre><code>first = ["Python", "Java"]
second = first

second.append("SQL")
print(first)
print(second)
print(first is second)</code></pre>
          <div class="output-box">['Python', 'Java', 'SQL']<br>['Python', 'Java', 'SQL']<br>True</div>
          <p>Both names refer to the same list, so changing the list through <code>second</code> is visible through <code>first</code>. Use <code>first.copy()</code> when you need a separate shallow copy.</p>

          <h2>Deleting a variable</h2>
          <p>The <code>del</code> statement removes a name from its namespace. It does not guarantee that an object is immediately destroyed; the object remains available while another reference points to it:</p>
          <pre><code>message = "Hello"
print(message)

del message
# print(message)  # NameError: message is no longer defined</code></pre>
          <div class="output-box">Hello</div>

          <h2>Best practices for Python variables</h2>
          <ul>
            <li>Choose descriptive names such as <code>total_price</code> and <code>student_count</code>.</li>
            <li>Use <code>snake_case</code> for variables and constants such as <code>MAX_RETRIES</code>.</li>
            <li>Keep a variable's purpose and type consistent within a small section of code.</li>
            <li>Avoid unnecessary global variables; pass data through function parameters.</li>
            <li>Validate and convert external input before using it in calculations.</li>
          </ul>
          } @else if (topic.slug === 'python-data-types') {
          <h2>What are data types in Python?</h2>
          <p>A data type describes the kind of value an object represents and the operations that can be performed on it. Python is dynamically typed, so you do not declare a variable's type before assigning a value. Python determines the type at runtime.</p>
          <pre><code>value = 10

print(value)
print(type(value))</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">10<br>&lt;class 'int'&gt;</div>
          <p>In this example, <code>value</code> refers to an integer object. The <code>type()</code> function reports the object's class.</p>

          <h2>Built-in Python data types</h2>
          <p>Python includes built-in types for numbers, text, collections, Boolean values, binary data, and missing values:</p>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Category</th><th>Types</th><th>Beginner-friendly use</th></tr></thead>
              <tbody>
                <tr><td>Numeric</td><td><code>int</code>, <code>float</code>, <code>complex</code></td><td>Whole numbers, decimal values, and complex calculations.</td></tr>
                <tr><td>Sequence</td><td><code>str</code>, <code>list</code>, <code>tuple</code>, <code>range</code></td><td>Ordered text, collections, fixed records, and number sequences.</td></tr>
                <tr><td>Set</td><td><code>set</code>, <code>frozenset</code></td><td>Unique values and set operations such as union and intersection.</td></tr>
                <tr><td>Mapping</td><td><code>dict</code></td><td>Key-value data such as user profiles or configuration.</td></tr>
                <tr><td>Boolean</td><td><code>bool</code></td><td>Truth values used in conditions.</td></tr>
                <tr><td>Binary</td><td><code>bytes</code>, <code>bytearray</code>, <code>memoryview</code></td><td>Files, network data, and other raw bytes.</td></tr>
                <tr><td>Special</td><td><code>NoneType</code></td><td>The absence of a value, represented by <code>None</code>.</td></tr>
              </tbody>
            </table>
          </div>
          <p>In Python, everything is an object. A variable is a name that refers to an object, and that object has a type.</p>

          <h2>Numeric types</h2>
          <p><code>int</code> stores whole numbers, <code>float</code> stores decimal values, and <code>complex</code> stores a real part and an imaginary part. Python integers can grow as large as available memory allows.</p>
          <pre><code>whole = 42
decimal = 3.14
complex_value = 2 + 5j

print(type(whole))
print(type(decimal))
print(type(complex_value))</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">&lt;class 'int'&gt;<br>&lt;class 'float'&gt;<br>&lt;class 'complex'&gt;</div>

          <h2>Sequence types</h2>
          <p>Sequence types store items in an order. Lists are mutable, tuples are immutable, strings contain text, and ranges represent a sequence of numbers without storing every number separately.</p>
          <pre><code>items = ["Python", 3, True]       # list
coordinates = (10, 20)           # tuple
language = "Python"              # string
numbers = range(1, 4)             # range

print(items)
print(coordinates)
print(language)
print(list(numbers))</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">['Python', 3, True]<br>(10, 20)<br>Python<br>[1, 2, 3]</div>
          <p>Use a list when values need to change, and use a tuple when the group of values should remain fixed.</p>

          <h2>Set types</h2>
          <p>A <code>set</code> stores unique values and can be changed. A <code>frozenset</code> also stores unique values, but it cannot be changed after creation. Sets do not support indexing, and their display order should not be relied upon.</p>
          <pre><code>languages = &#123;"Python", "Java", "Python"&#125;
fixed_languages = frozenset(["Python", "Java"])

print(len(languages))
print(type(fixed_languages))</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">2<br>&lt;class 'frozenset'&gt;</div>

          <h2>Dictionary type</h2>
          <p>A dictionary stores data as key-value pairs. Keys must be unique and hashable. Dictionaries preserve insertion order in modern Python versions and are useful for named data.</p>
          <pre><code>student = &#123;
    "name": "Asha",
    "age": 20,
    "course": "Python"
&#125;

print(student["name"])
print(type(student))</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Asha<br>&lt;class 'dict'&gt;</div>

          <h2>Boolean and None types</h2>
          <p><code>bool</code> has only two values: <code>True</code> and <code>False</code>. The special value <code>None</code> means that a value is absent or not available. These values are commonly used in conditions and function results.</p>
          <pre><code>is_logged_in = True
profile = None

print(is_logged_in)
print(profile is None)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">True<br>True</div>

          <h2>Binary data types</h2>
          <p><code>bytes</code> is an immutable sequence of integers from 0 to 255. <code>bytearray</code> is its mutable counterpart, while <code>memoryview</code> provides access to binary data without making an unnecessary copy.</p>
          <pre><code>data = bytes([65, 66, 67])
mutable_data = bytearray(data)
mutable_data[0] = 90

print(data)
print(mutable_data)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">b'ABC'<br>bytearray(b'ZBC')</div>

          <h2>Checking and comparing types</h2>
          <p>Use <code>type()</code> when you need the exact type. Use <code>isinstance()</code> when you want to check whether an object belongs to a type or one of its subclasses.</p>
          <pre><code>age = 21

print(type(age) is int)
print(isinstance(age, int))</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">True<br>True</div>

          <h2>Type conversion</h2>
          <p>Type conversion creates a value of another type. Python performs some conversions automatically, such as converting an integer to a float during mixed arithmetic. You can request a conversion explicitly with functions such as <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>list()</code>, and <code>tuple()</code>.</p>
          <pre><code>price = 19
decimal_price = float(price)
number_text = str(price)

print(decimal_price)
print(number_text, type(number_text))</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">19.0<br>19 &lt;class 'str'&gt;</div>
          <p>Conversions can fail or lose information. For example, <code>int(7.9)</code> removes the fractional part, and <code>int("hello")</code> raises <code>ValueError</code>.</p>

          <h2>Key points for beginners</h2>
          <ul>
            <li>Python assigns types at runtime; variable declarations do not need a type keyword.</li>
            <li>Lists, dictionaries, sets, and bytearrays are mutable; strings, tuples, bytes, and frozensets are immutable.</li>
            <li>Use <code>isinstance()</code> for readable type checks in application code.</li>
            <li>Use <code>None</code> to represent an intentionally missing value and compare it with <code>is None</code>.</li>
            <li>Choose a data type based on the operations and behavior your program needs.</li>
          </ul>
          } @else if (topic.slug === 'python-numbers') {
          <h2>What are numbers in Python?</h2>
          <p>Numbers are built-in values used for counting, measuring, calculating, and representing mathematical quantities. Python provides three main numeric types: integers, floating-point numbers, and complex numbers.</p>

          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Type</th><th>Example</th><th>When to use it</th></tr></thead>
              <tbody>
                <tr><td><code>int</code></td><td><code>42</code>, <code>-7</code>, <code>0</code></td><td>Whole numbers. Python integers can grow beyond a fixed machine-size limit.</td></tr>
                <tr><td><code>float</code></td><td><code>3.14</code>, <code>-0.5</code>, <code>2e3</code></td><td>Numbers with a fractional part or scientific notation.</td></tr>
                <tr><td><code>complex</code></td><td><code>3 + 4j</code></td><td>Values with real and imaginary parts, often used in scientific and engineering calculations.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Checking a number's type</h2>
          <p>Use <code>type()</code> to inspect the class of a numeric value:</p>
          <pre><code>whole_number = 6
decimal_number = 8.3
complex_number = 2 - 5j

print(type(whole_number))
print(type(decimal_number))
print(type(complex_number))</code></pre>
          <div class="output-box">&lt;class 'int'&gt;<br>&lt;class 'float'&gt;<br>&lt;class 'complex'&gt;</div>

          <h2>Python integers and arithmetic</h2>
          <p>An integer is a whole number without a decimal part. It can be positive, negative, or zero. Python integers support arbitrary precision, so the practical limit is available memory:</p>
          <pre><code>a = 8
b = 3

print(a + b)   # addition: 11
print(a - b)   # subtraction: 5
print(a * b)   # multiplication: 24
print(a / b)   # true division: 2.6666666666666665
print(a // b)  # floor division: 2
print(a % b)   # remainder: 2
print(a ** b)  # exponentiation: 512</code></pre>
          <p>The <code>/</code> operator returns a float, <code>//</code> performs floor division, <code>%</code> returns the remainder, and <code>**</code> raises a number to a power. Floor division rounds toward negative infinity.</p>

          <h2>Python floating-point numbers</h2>
          <p>A floating-point number contains a decimal point or uses scientific notation. Python's ordinary <code>float</code> is normally implemented using IEEE 754 double precision. It is fast and useful, but it cannot represent every decimal fraction exactly.</p>
          <pre><code>temperature = 5.85253
balance = -7.23
scientific_value = 3e6

print(temperature)
print(balance)
print(scientific_value)</code></pre>
          <div class="output-box">5.85253<br>-7.23<br>3000000.0</div>
          <p>Small rounding differences are normal with binary floating-point arithmetic. Use <code>math.isclose()</code> for approximate comparisons and consider <code>decimal.Decimal</code> when exact decimal arithmetic is required, such as financial calculations.</p>
          <pre><code>import math

result = 0.1 + 0.2
print(math.isclose(result, 0.3))</code></pre>
          <div class="output-box">True</div>

          <h2>Python complex numbers</h2>
          <p>A complex number has a real part and an imaginary part. Python uses <code>j</code> for the imaginary unit:</p>
          <pre><code>first = 4 + 7j
second = 6 - 2j

print(first)
print(second)
print(first.real)
print(first.imag)
print(first.conjugate())</code></pre>
          <p>Complex values support addition, subtraction, multiplication, division, and exponentiation. The <code>real</code> and <code>imag</code> attributes return the two parts, while <code>conjugate()</code> returns the complex conjugate.</p>

          <h2>Converting numeric values</h2>
          <p>Python can convert compatible numeric values implicitly, and you can request a conversion explicitly with <code>int()</code>, <code>float()</code>, or <code>complex()</code>:</p>
          <pre><code>integer_value = 13
float_value = 4.6

total = integer_value + float_value
quotient = integer_value / 5

print(total, type(total))
print(quotient, type(quotient))

print(int(7.9))
print(float(6))
print(complex(8))</code></pre>
          <div class="output-box">17.6 &lt;class 'float'&gt;<br>2.6 &lt;class 'float'&gt;<br>7<br>6.0<br>(8+0j)</div>
          <p>Converting a float to an integer removes the fractional part; it does not round to the nearest integer. Invalid text conversion raises <code>ValueError</code>, so validate external input before converting it.</p>

          <h2>Generating random numbers</h2>
          <p>The <code>random</code> module generates pseudorandom values for simulations, games, testing, and sampling. It is not suitable for passwords or security tokens; use the <code>secrets</code> module for those cases.</p>
          <pre><code>import random

print(random.randrange(5, 25))
print(random.random())

colors = ["red", "green", "blue"]
print(random.choice(colors))</code></pre>
          <p>Random results vary each time the program runs. Use <code>random.seed()</code> when a repeatable sequence is useful for a test or demonstration.</p>

          <h2>Mathematical operations with the math module</h2>
          <p>The <code>math</code> module provides constants and functions for square roots, logarithms, trigonometry, factorials, and other common calculations:</p>
          <pre><code>import math

print(math.pi)
print(math.sqrt(81))
print(math.log10(10000))
print(math.factorial(5))</code></pre>
          <div class="output-box">3.141592653589793<br>9.0<br>4.0<br>120</div>

          <h2>Tips for working with Python numbers</h2>
          <ul>
            <li>Use <code>int</code> for exact whole-number counts and indexes.</li>
            <li>Use <code>float</code> for approximate measurements and general decimal calculations.</li>
            <li>Use <code>decimal.Decimal</code> when exact decimal arithmetic is important.</li>
            <li>Use <code>math.isclose()</code> instead of direct equality for approximate float results.</li>
            <li>Use <code>complex</code> when the problem requires real and imaginary components.</li>
            <li>Use <code>secrets</code>, not <code>random</code>, for security-sensitive random values.</li>
          </ul>
          } @else if (topic.slug === 'python-strings') {
          <h2>What is a string in Python?</h2>
          <p>A string is an ordered sequence of text characters. It can contain letters, numbers, punctuation, spaces, Unicode characters, and emojis. Python does not have a separate character type, so one character is simply a string with length one.</p>

          <h2>Creating strings</h2>
          <p>Use matching single or double quotation marks. Choose the style that lets you include the other quote without unnecessary escaping:</p>
          <pre><code>single_quoted = 'Python'
double_quoted = "Programming"
with_apostrophe = "Python's syntax is readable"

print(single_quoted)
print(double_quoted)
print(with_apostrophe)
print(type(single_quoted))</code></pre>
          <div class="output-box">Python<br>Programming<br>Python's syntax is readable<br>&lt;class 'str'&gt;</div>

          <h2>Multiline strings</h2>
          <p>Triple single or double quotes create a string that can span multiple lines. They are useful for long text and documentation strings:</p>
          <pre><code>message = """Learning Python
is easier when examples
are clear and practical."""

print(message)</code></pre>
          <div class="output-box">Learning Python<br>is easier when examples<br>are clear and practical.</div>

          <h2>Important characteristics of strings</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Characteristic</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td>Ordered</td><td>Each character has a position, starting at index <code>0</code>.</td></tr>
                <tr><td>Immutable</td><td>An existing string cannot be changed in place; operations return a new string.</td></tr>
                <tr><td>Iterable</td><td>You can visit each character with a <code>for</code> loop.</td></tr>
                <tr><td>Sliceable</td><td>You can extract part of a string with <code>text[start:end]</code>.</td></tr>
                <tr><td>Unicode-aware</td><td>Python 3 strings support text from many languages and symbols.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Accessing characters with indexes</h2>
          <p>Indexes start at zero from the left. Negative indexes count backward from the end, where <code>-1</code> is the last character:</p>
          <pre><code>text = "Python"

print(text[0])
print(text[2])
print(text[-1])
print(text[-2])</code></pre>
          <div class="output-box">P<br>t<br>n<br>o</div>
          <p>An index outside the valid range raises <code>IndexError</code>. Indexes must be integers.</p>

          <h2>String slicing</h2>
          <p>Slicing extracts a range using the form <code>text[start:stop:step]</code>. The start index is included, but the stop index is excluded:</p>
          <pre><code>text = "Python"

print(text[1:4])   # characters at indexes 1, 2, and 3
print(text[:3])    # from the beginning
print(text[3:])    # from index 3 to the end
print(text[::2])   # every second character
print(text[::-1])  # reversed string</code></pre>
          <div class="output-box">yth<br>Pyt<br>hon<br>pto<br>nohtyP</div>

          <h2>Strings are immutable</h2>
          <p>You cannot replace one character directly inside an existing string. Create a new string using slicing, concatenation, or a method such as <code>replace()</code>:</p>
          <pre><code>message = "welcome learners"

# message[0] = "W"  # TypeError: strings cannot be changed in place
capitalized = "W" + message[1:]
updated = message.replace("learners", "Python developers")

print(capitalized)
print(updated)</code></pre>
          <div class="output-box">Welcome learners<br>welcome Python developers</div>

          <h2>Useful string operations</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Operation</th><th>Example</th><th>Result or purpose</th></tr></thead>
              <tbody>
                <tr><td>Length</td><td><code>len("Python")</code></td><td>Returns <code>6</code>.</td></tr>
                <tr><td>Concatenation</td><td><code>"Py" + "thon"</code></td><td>Combines strings.</td></tr>
                <tr><td>Repetition</td><td><code>"ha" * 3</code></td><td>Produces <code>"hahaha"</code>.</td></tr>
                <tr><td>Membership</td><td><code>"Py" in "Python"</code></td><td>Returns <code>True</code>.</td></tr>
                <tr><td>Case conversion</td><td><code>text.upper()</code></td><td>Returns a new uppercase string.</td></tr>
                <tr><td>Whitespace removal</td><td><code>text.strip()</code></td><td>Removes leading and trailing whitespace.</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>first = "Py"
second = "thon"

print(first + second)
print("ha" * 3)
print(len("Python"))</code></pre>
          <div class="output-box">Python<br>hahaha<br>6</div>

          <h2>Common string methods</h2>
          <p>String methods do not modify the original string. They return a new value:</p>
          <pre><code>text = "  Learning Python is fun!  "

print(text.strip())
print(text.upper())
print(text.lower())
print(text.replace("fun", "useful"))
print("Python,Java,SQL".split(","))
print("-".join(["Python", "Java", "SQL"]))</code></pre>
          <p><code>strip()</code> removes outer whitespace, <code>upper()</code> and <code>lower()</code> change case, <code>replace()</code> substitutes text, <code>split()</code> creates a list, and <code>join()</code> combines an iterable of strings.</p>

          <h2>Checking and searching text</h2>
          <pre><code>text = "Python programming"

print(text.startswith("Python"))
print(text.endswith("ing"))
print(text.find("program"))
print(text.count("m"))
print(text.isalpha())
print("123".isdigit())</code></pre>
          <p>Methods such as <code>startswith()</code>, <code>endswith()</code>, <code>find()</code>, and <code>count()</code> help search text. Validation methods such as <code>isalpha()</code> and <code>isdigit()</code> inspect the contents of a string.</p>

          <h2>Concatenation and formatting</h2>
          <p>Use <code>+</code> for simple concatenation. For messages containing several values, f-strings are usually the clearest option:</p>
          <pre><code>name = "Asha"
age = 25
city = "Pune"

message = f"&#123;name&#125; is &#123;age&#125; years old and lives in &#123;city&#125;."
print(message)</code></pre>
          <div class="output-box">Asha is 25 years old and lives in Pune.</div>
          <p>The older <code>format()</code> method is still useful in existing code:</p>
          <pre><code>message = "&#123;&#125; works with &#123;&#125;.".format("Asha", "Python")
print(message)</code></pre>

          <h2>Escape characters and raw strings</h2>
          <p>Escape sequences represent special characters inside a quoted string:</p>
          <pre><code>print("First line\nSecond line")
print("Column 1\tColumn 2")
print("She said, \"Hello!\"")
print("C:\\Users\\Asha")</code></pre>
          <p>A raw string treats backslashes mostly as ordinary characters, which is convenient for regular expressions and Windows-style paths:</p>
          <pre><code>path = r"C:\Users\Asha\notes.txt"
print(path)</code></pre>

          <h2>Testing membership</h2>
          <p>Use <code>in</code> and <code>not in</code> to check whether a character or substring exists:</p>
          <pre><code>text = "Python programming"

print("Python" in text)
print("Java" in text)
print("SQL" not in text)</code></pre>
          <div class="output-box">True<br>False<br>True</div>

          <h2>Deleting a string name</h2>
          <p>You cannot delete one character from an immutable string, but <code>del</code> can remove the variable name from its namespace:</p>
          <pre><code>message = "Hello"
del message
# print(message)  # NameError: message is no longer defined</code></pre>

          <h2>Best practices for Python strings</h2>
          <ul>
            <li>Use clear quotation styles and escape quotes only when necessary.</li>
            <li>Remember that methods return new strings because strings are immutable.</li>
            <li>Use f-strings for readable messages that include variables.</li>
            <li>Use <code>strip()</code> and validation methods when processing user input.</li>
            <li>Use <code>join()</code> instead of repeatedly concatenating many strings in a loop.</li>
            <li>Use Unicode text directly in Python 3 and choose an explicit encoding when reading or writing files.</li>
          </ul>
          } @else if (topic.slug === 'python-if-else') {
          <h2>What are conditional statements in Python?</h2>
          <p>Conditional statements let a program choose which code to run based on a condition. Python evaluates the condition as a Boolean value. When it is true, the associated indented block runs; otherwise, Python checks another branch or skips the block.</p>

          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Statement</th><th>Use it when...</th></tr></thead>
              <tbody>
                <tr><td><code>if</code></td><td>You need to run code only when a condition is true.</td></tr>
                <tr><td><code>if ... else</code></td><td>There are exactly two possible paths.</td></tr>
                <tr><td><code>if ... elif ... else</code></td><td>Several mutually exclusive conditions must be checked.</td></tr>
                <tr><td>Nested <code>if</code></td><td>A second condition depends on the first condition being true.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>The <code>if</code> statement</h2>
          <p>An <code>if</code> statement runs its indented block only when the condition is true. The colon begins the block, and indentation defines its boundaries:</p>
          <pre><code>age = 18

if age &gt;= 18:
    print("You can vote.")</code></pre>
          <div class="output-box">You can vote.</div>
          <p>If the condition is false, Python skips the block and continues with the next statement.</p>

          <h2>The <code>if ... else</code> statement</h2>
          <p>Use <code>else</code> when one of two actions must run:</p>
          <pre><code>age = 16

if age &gt;= 18:
    print("You can vote.")
else:
    print("You cannot vote yet.")</code></pre>
          <div class="output-box">You cannot vote yet.</div>
          <p>Exactly one branch runs. The <code>else</code> block does not have its own condition; it handles every case not matched by the <code>if</code>.</p>

          <h2>The <code>if ... elif ... else</code> statement</h2>
          <p>Use <code>elif</code> to test multiple conditions in order. Python stops at the first condition that is true:</p>
          <pre><code>temperature = 22

if temperature &gt;= 30:
    print("Hot")
elif temperature &gt;= 20:
    print("Warm")
elif temperature &gt;= 10:
    print("Cool")
else:
    print("Cold")</code></pre>
          <div class="output-box">Warm</div>
          <p>Order matters. Put more specific or higher thresholds before broader conditions so the intended branch can be reached.</p>

          <h2>Nested conditional statements</h2>
          <p>A nested conditional is an <code>if</code> statement inside another conditional block. It is useful when the second check should happen only after the first requirement succeeds:</p>
          <pre><code>marks = 82

if marks &gt;= 40:
    if marks &gt;= 75:
        print("Passed with distinction")
    else:
        print("Passed")
else:
    print("Failed")</code></pre>
          <div class="output-box">Passed with distinction</div>
          <p>Deep nesting can make code difficult to read. When possible, combine conditions or move the decision into a well-named function.</p>

          <h2>Comparison operators in conditions</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td><code>==</code></td><td>Equal to</td><td><code>status == "active"</code></td></tr>
                <tr><td><code>!=</code></td><td>Not equal to</td><td><code>role != "guest"</code></td></tr>
                <tr><td><code>&lt;</code>, <code>&lt;=</code></td><td>Less than or less than or equal to</td><td><code>score &lt; 50</code></td></tr>
                <tr><td><code>&gt;</code>, <code>&gt;=</code></td><td>Greater than or greater than or equal to</td><td><code>age &gt;= 18</code></td></tr>
                <tr><td><code>is</code></td><td>Same object identity</td><td><code>value is None</code></td></tr>
                <tr><td><code>in</code></td><td>Member exists in a container</td><td><code>"admin" in roles</code></td></tr>
              </tbody>
            </table>
          </div>

          <h2>Combining conditions</h2>
          <p>Use <code>and</code> when all conditions must be true, <code>or</code> when at least one condition can be true, and <code>not</code> to reverse a result:</p>
          <pre><code>age = 25
has_id = True
is_member = False

if age &gt;= 18 and has_id:
    print("Access approved")

if is_member or has_id:
    print("A verification option is available")

if not is_member:
    print("Membership is not active")</code></pre>
          <div class="output-box">Access approved<br>A verification option is available<br>Membership is not active</div>
          <p>Use parentheses when a condition mixes <code>and</code> and <code>or</code>. They make the intended grouping clear and prevent precedence mistakes.</p>

          <h2>Truthy and falsy values</h2>
          <p>Python allows any object in a condition. Empty strings and collections, zero, <code>None</code>, and <code>False</code> are falsy; most non-empty or non-zero values are truthy:</p>
          <pre><code>items = ["Python"]

if items:
    print("The list has items")

name = ""
if not name:
    print("A name is required")</code></pre>
          <div class="output-box">The list has items<br>A name is required</div>

          <h2>Independent <code>if</code> statements versus <code>elif</code></h2>
          <p>Use separate <code>if</code> statements when more than one message may be correct. Use <code>elif</code> when only one branch should run:</p>
          <pre><code>age = 65

# Both conditions can produce a message
if age &gt;= 18:
    print("Adult")
if age &gt;= 60:
    print("Senior benefits may apply")

# Only the first matching branch runs
if age &gt;= 60:
    print("Senior")
elif age &gt;= 18:
    print("Adult")</code></pre>

          <h2>Validating user input</h2>
          <p>Conditions are commonly used to validate values before processing them. Convert input safely and check the valid range:</p>
          <pre><code>try:
    marks = int(input("Enter marks from 0 to 100: "))
    if 0 &lt;= marks &lt;= 100:
        print("Valid marks")
    else:
        print("Marks must be between 0 and 100")
except ValueError:
    print("Please enter a whole number")</code></pre>
          <p>Chained comparisons such as <code>0 &lt;= marks &lt;= 100</code> are equivalent to checking both limits with <code>and</code>.</p>

          <h2>Conditional expressions</h2>
          <p>A conditional expression chooses one of two values in a single line. Use it only when the logic remains easy to read:</p>
          <pre><code>score = 72
result = "Pass" if score &gt;= 40 else "Fail"
print(result)</code></pre>
          <div class="output-box">Pass</div>

          <h2>Common mistakes</h2>
          <ul>
            <li>Use a colon after <code>if</code>, <code>elif</code>, and <code>else</code>.</li>
            <li>Indent every statement that belongs to a conditional block consistently.</li>
            <li>Use <code>==</code> for value comparison; a single <code>=</code> assigns a value.</li>
            <li>Use <code>is None</code> for checking <code>None</code>, not <code>== None</code>.</li>
            <li>Check conditions in the correct order because <code>elif</code> stops after the first match.</li>
            <li>Validate and convert external input before comparing it with numbers.</li>
          </ul>

          <h2>Best practices</h2>
          <ul>
            <li>Keep conditions short and give complex rules descriptive function names.</li>
            <li>Prefer guard clauses to deeply nested blocks when returning early is clear.</li>
            <li>Use parentheses for complex Boolean expressions.</li>
            <li>Choose <code>elif</code> for mutually exclusive outcomes and separate <code>if</code> statements for independent checks.</li>
          </ul>
          } @else if (topic.slug === 'difference-between-for-loop-and-while-loop-in-python') {
          <h2>What is the difference between <code>for</code> and <code>while</code> loops?</h2>
          <p>Both loops repeat code, but they are designed for different situations. A <code>for</code> loop is usually best when iterating over an iterable or a known sequence. A <code>while</code> loop is useful when repetition depends on a condition that may change during execution.</p>

          <h2>The Python <code>for</code> loop</h2>
          <p>A <code>for</code> loop visits each item in an iterable such as a list, string, tuple, dictionary, or <code>range</code>:</p>
          <pre><code>for item in iterable:
    # code executed for each item
    print(item)</code></pre>
          <p>Python automatically obtains the next item and stops when the iterable is exhausted.</p>

          <h2>Example: using a <code>for</code> loop</h2>
          <pre><code>for number in range(1, 6):
    print(number)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">1<br>2<br>3<br>4<br>5</div>
          <p>This loop has a predictable number of iterations because <code>range(1, 6)</code> produces five values.</p>

          <h2>The Python <code>while</code> loop</h2>
          <p>A <code>while</code> loop repeats a block as long as its condition is true:</p>
          <pre><code>while condition:
    # code executed while condition is true</code></pre>
          <p>The condition is checked before every iteration. The loop variable or other state must be updated so the condition can eventually become false.</p>

          <h2>Example: using a <code>while</code> loop</h2>
          <pre><code>number = 1

while number &lt;= 5:
    print(number)
    number += 1</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">1<br>2<br>3<br>4<br>5</div>
          <p>The counter is updated after every iteration. When it becomes 6, the condition is false and the loop ends.</p>

          <h2>Differences between <code>for</code> and <code>while</code></h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Feature</th><th><code>for</code> loop</th><th><code>while</code> loop</th></tr></thead>
              <tbody>
                <tr><td>Basic purpose</td><td>Iterates over an iterable.</td><td>Repeats while a condition is true.</td></tr>
                <tr><td>Best choice</td><td>When a sequence or collection is available.</td><td>When the stopping condition is dynamic.</td></tr>
                <tr><td>Loop variable</td><td>Updated automatically for each item.</td><td>Usually updated manually inside the loop.</td></tr>
                <tr><td>Termination</td><td>Ends when the iterable has no more items.</td><td>Ends when its condition becomes false.</td></tr>
                <tr><td>Infinite-loop risk</td><td>Low when iterating over a finite iterable.</td><td>Higher if the condition never changes.</td></tr>
                <tr><td>Common use</td><td>Processing lists, strings, files, and ranges.</td><td>Waiting, retrying, validating, or polling.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Iterating over a collection</h2>
          <p>A <code>for</code> loop is concise when every item in a collection must be processed:</p>
          <pre><code>languages = ["Python", "Java", "SQL"]

for language in languages:
    print(language)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Python<br>Java<br>SQL</div>

          <h2>Repeat until a condition changes</h2>
          <p>A <code>while</code> loop is useful when the number of repetitions depends on changing state:</p>
          <pre><code>attempt = 1

while attempt &lt;= 3:
    print("Attempt", attempt)
    attempt += 1</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Attempt 1<br>Attempt 2<br>Attempt 3</div>

          <h2>Choosing the right loop</h2>
          <ul>
            <li>Choose <code>for</code> when you are visiting each item in a collection or a known range.</li>
            <li>Choose <code>while</code> when the loop should continue until a condition changes.</li>
            <li>Use <code>break</code> when a loop should stop early.</li>
            <li>Use <code>continue</code> when one iteration should be skipped.</li>
            <li>Always update the state used by a <code>while</code> condition to avoid an accidental infinite loop.</li>
          </ul>

          <h2>Loop <code>else</code> blocks</h2>
          <p>Both loop types can have an <code>else</code> block. It runs when the loop finishes normally and does not run when the loop exits through <code>break</code>:</p>
          <pre><code>for number in range(3):
    print(number)
else:
    print("Loop completed")</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">0<br>1<br>2<br>Loop completed</div>
          } @else if (topic.slug === 'difference-between-break-and-continue-in-python') {
          <h2>What is the difference between <code>break</code> and <code>continue</code>?</h2>
          <p>Both statements change the normal flow of a loop. <code>break</code> ends the nearest loop completely, while <code>continue</code> skips only the current iteration and lets the loop process the next item.</p>

          <h2>The <code>break</code> statement</h2>
          <p>Use <code>break</code> when the loop should stop as soon as a condition is met:</p>
          <pre><code>for number in range(1, 11):
    if number % 2 == 0:
        break
    print(number)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">1</div>
          <p>The loop prints 1, then stops when it reaches the first even number, 2. No later iterations run.</p>

          <h2>The <code>continue</code> statement</h2>
          <p>Use <code>continue</code> when one item should be ignored but the loop should continue:</p>
          <pre><code>for number in range(1, 11):
    if number % 2 == 0:
        continue
    print(number)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">1<br>3<br>5<br>7<br>9</div>
          <p>Even numbers are skipped, but the loop continues until all numbers have been processed.</p>

          <h2>Comparison table</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Feature</th><th><code>break</code></th><th><code>continue</code></th></tr></thead>
              <tbody>
                <tr><td>Purpose</td><td>Stops the nearest loop.</td><td>Skips the current iteration.</td></tr>
                <tr><td>Later iterations</td><td>Do not run.</td><td>Continue to run.</td></tr>
                <tr><td>Control moves to</td><td>The first statement after the loop.</td><td>The next iteration of the same loop.</td></tr>
                <tr><td>Typical use</td><td>Stop after finding a result.</td><td>Ignore invalid or unwanted items.</td></tr>
                <tr><td>Works with</td><td><code>for</code> and <code>while</code> loops.</td><td><code>for</code> and <code>while</code> loops.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Find the first matching item with <code>break</code></h2>
          <p>Once the requested item is found, there is no need to inspect the remaining list:</p>
          <pre><code>languages = ["Java", "Python", "Go", "Rust"]

for language in languages:
    if language == "Python":
        print("Found:", language)
        break</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Found: Python</div>

          <h2>Ignore invalid values with <code>continue</code></h2>
          <p>Continue processing valid values while skipping negative numbers:</p>
          <pre><code>numbers = [10, -2, 5, -8, 7]

for number in numbers:
    if number &lt; 0:
        continue
    print(number)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">10<br>5<br>7</div>

          <h2>Using them in a <code>while</code> loop</h2>
          <p>When using <code>continue</code> in a <code>while</code> loop, update the counter before continuing. Otherwise, the condition may never change and the program may run forever:</p>
          <pre><code>number = 0

while number &lt; 5:
    number += 1
    if number == 3:
        continue
    print(number)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">1<br>2<br>4<br>5</div>

          <h2><code>break</code>, <code>continue</code>, and <code>pass</code></h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Statement</th><th>Effect</th></tr></thead>
              <tbody>
                <tr><td><code>break</code></td><td>Ends the nearest loop immediately.</td></tr>
                <tr><td><code>continue</code></td><td>Skips the rest of the current iteration and starts the next one.</td></tr>
                <tr><td><code>pass</code></td><td>Does nothing and acts as a placeholder.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Key points for beginners</h2>
          <ul>
            <li>Use <code>break</code> to stop searching or processing.</li>
            <li>Use <code>continue</code> to filter or ignore selected values.</li>
            <li>Neither statement is used as a replacement for a condition; both normally appear inside an <code>if</code> block.</li>
            <li>In nested loops, each statement affects only the nearest loop.</li>
          </ul>
          } @else if (topic.slug === 'python-pass') {
          <h2>What is the Python <code>pass</code> statement?</h2>
          <p><code>pass</code> is a statement that does nothing. It is used as a placeholder when Python requires an indented block, but you do not want to add behavior yet.</p>
          <p>Unlike a comment, <code>pass</code> is valid executable Python syntax. The interpreter runs it and immediately moves to the next statement.</p>

          <h2>Syntax of <code>pass</code></h2>
          <pre><code>def function_name():
    pass</code></pre>
          <p>The function is valid even though its body is empty. You can replace <code>pass</code> with real code later.</p>

          <h2>Use <code>pass</code> in a function</h2>
          <p>An empty function can be created while you are planning an application:</p>
          <pre><code>def send_greeting():
    pass

send_greeting()
print("The function ran without an error.")</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">The function ran without an error.</div>
          <p>The function call produces no output because its only statement is <code>pass</code>.</p>

          <h2>Use <code>pass</code> in a conditional statement</h2>
          <p>Use <code>pass</code> when a condition is intentionally left without behavior:</p>
          <pre><code>number = 5

if number &gt; 5:
    pass
else:
    print("The number is 5 or less.")</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">The number is 5 or less.</div>

          <h2>Use <code>pass</code> in a loop</h2>
          <p>In this example, the loop keeps running, but it performs no special action when the value is 5:</p>
          <pre><code>for number in range(10):
    if number == 5:
        pass
    else:
        print(number)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">0<br>1<br>2<br>3<br>4<br>6<br>7<br>8<br>9</div>
          <p>Here, the <code>else</code> block controls what is printed. The <code>pass</code> statement itself does not skip the loop or print anything.</p>

          <h2>Use <code>pass</code> in an empty class</h2>
          <p>A class body cannot be empty. Use <code>pass</code> while the class design is still being planned:</p>
          <pre><code>class Report:
    pass

report = Report()
print(type(report).__name__)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Report</div>

          <h2>Use <code>pass</code> in a method</h2>
          <p>You can define a method as a placeholder and implement it later:</p>
          <pre><code>class Employee:
    def calculate_bonus(self):
        pass

employee = Employee()
employee.calculate_bonus()
print("Employee object created.")</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Employee object created.</div>
          <p>The method call is valid and returns <code>None</code> implicitly because the method has no return statement.</p>

          <h2><code>pass</code> versus <code>continue</code> and <code>break</code></h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Statement</th><th>What it does</th><th>Effect on a loop</th></tr></thead>
              <tbody>
                <tr><td><code>pass</code></td><td>Does nothing.</td><td>The current iteration continues normally.</td></tr>
                <tr><td><code>continue</code></td><td>Skips the remaining statements in the current iteration.</td><td>Moves to the next iteration.</td></tr>
                <tr><td><code>break</code></td><td>Stops the nearest loop.</td><td>No later iterations run.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>When should you use <code>pass</code>?</h2>
          <ul>
            <li>When a function or class is planned but not implemented yet.</li>
            <li>When a condition is intentionally ignored.</li>
            <li>When a required block must remain syntactically valid during development.</li>
            <li>When creating a minimal example or a temporary prototype.</li>
          </ul>
          <p>Use comments to explain why a block is empty. Replace <code>pass</code> with real behavior when the feature is implemented.</p>
          } @else if (topic.slug === 'python-break-statement') {
          <h2>What is the Python <code>break</code> statement?</h2>
          <p>The <code>break</code> statement stops the nearest loop immediately. After Python executes <code>break</code>, control moves to the first statement after that loop. It is useful when the result has been found or continuing would be unnecessary.</p>

          <h2>Syntax of <code>break</code></h2>
          <pre><code>for item in sequence:
    if condition:
        break
    # code that runs until the condition is met</code></pre>
          <p>In nested loops, <code>break</code> exits only the innermost loop where it appears.</p>

          <h2>Stop a <code>for</code> loop</h2>
          <p>This loop stops when the number reaches 6, so 6 and the remaining values are not printed:</p>
          <pre><code>for number in range(1, 11):
    if number == 6:
        break
    print(number)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">1<br>2<br>3<br>4<br>5</div>

          <h2>Find an item in a list</h2>
          <p><code>break</code> prevents unnecessary work after the requested item is found:</p>
          <pre><code>fruits = ["apple", "mango", "banana", "orange", "kiwi"]

for index, fruit in enumerate(fruits):
    if fruit == "kiwi":
        print("Fruit found!")
        print("Located at index =", index)
        break</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Fruit found!<br>Located at index = 4</div>

          <h2>Use <code>break</code> in a <code>while</code> loop</h2>
          <p>A <code>while True</code> loop can be stopped safely when a condition inside the loop becomes true:</p>
          <pre><code>count = 1

while True:
    print("Count:", count)
    if count == 5:
        print("Condition met! Exiting loop.")
        break
    count += 1</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Count: 1<br>Count: 2<br>Count: 3<br>Count: 4<br>Count: 5<br>Condition met! Exiting loop.</div>

          <h2>Break from nested loops</h2>
          <p>A <code>break</code> statement exits only the inner loop. A flag can be used to exit the outer loop after the value is found:</p>
          <pre><code>matrix = [
    [10, 15, 20],
    [25, 30, 35],
    [40, 45, 50]
]
target = 30
found = False

for row in matrix:
    for number in row:
        if number == target:
            print("Number found:", target)
            found = True
            break
    if found:
        break</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Number found: 30</div>
          <p>For more complex searches, placing the loops inside a function and returning when the item is found can be clearer than using a flag.</p>

          <h2><code>break</code> versus <code>continue</code></h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Statement</th><th>What it does</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td><code>break</code></td><td>Stops the nearest loop.</td><td>No later iterations run.</td></tr>
                <tr><td><code>continue</code></td><td>Skips the current iteration.</td><td>The loop continues with the next item.</td></tr>
                <tr><td><code>pass</code></td><td>Does nothing.</td><td>The loop continues normally.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Common mistakes</h2>
          <ul>
            <li>Remember that <code>break</code> exits only the nearest loop.</li>
            <li>Do not use <code>break</code> when you only need to skip one item; use <code>continue</code> instead.</li>
            <li>When using <code>while True</code>, make sure a reachable condition eventually executes <code>break</code>.</li>
            <li>Keep the stopping condition clear so readers understand why the loop ends.</li>
          </ul>
          } @else if (topic.slug === 'python-continue') {
          <h2>What is the Python <code>continue</code> statement?</h2>
          <p>The <code>continue</code> statement skips the remaining code in the current loop iteration and starts the next iteration. It is useful when you want to ignore selected values while allowing the loop to continue.</p>

          <h2>Syntax of <code>continue</code></h2>
          <pre><code>for item in sequence:
    if condition:
        continue
    # code for items that were not skipped</code></pre>
          <p>When Python reaches <code>continue</code>, it does not execute the statements below it in that iteration. In a nested loop, it affects only the loop where it appears.</p>

          <h2>Skip even numbers with a <code>for</code> loop</h2>
          <p>This example prints only odd numbers by skipping every even number:</p>
          <pre><code>for number in range(1, 11):
    if number % 2 == 0:
        continue
    print(number)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">1<br>3<br>5<br>7<br>9</div>
          <p>The remainder operator identifies even numbers. For an even number, <code>continue</code> jumps directly to the next loop iteration.</p>

          <h2>Skip a value in a string</h2>
          <p>A loop can use <code>continue</code> to ignore particular characters:</p>
          <pre><code>for character in "Python Programming":
    if character == "o":
        continue
    print(character, end="")</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Pythn Prgramming</div>

          <h2>Use <code>continue</code> in a <code>while</code> loop</h2>
          <p>Always update the loop variable before continuing, otherwise the condition may never change and the loop can become infinite:</p>
          <pre><code>number = 0

while number &lt; 10:
    number += 1
    if number == 5:
        continue
    print(number)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">1<br>2<br>3<br>4<br>6<br>7<br>8<br>9<br>10</div>

          <h2>Skip negative numbers</h2>
          <p>Use <code>continue</code> to process only values that meet a rule:</p>
          <pre><code>numbers = [10, -3, 5, -8, 7]

for number in numbers:
    if number &lt; 0:
        continue
    print(number)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">10<br>5<br>7</div>

          <h2>Skip selected words</h2>
          <p>Membership testing makes it easy to skip more than one word:</p>
          <pre><code>sentence = "Python learners can practice every day"
words_to_skip = ["can", "every"]

for word in sentence.split():
    if word in words_to_skip:
        continue
    print(word, end=" ")</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Python learners practice day </div>

          <h2>Skip empty strings</h2>
          <p>This pattern is helpful when cleaning a list before processing its values:</p>
          <pre><code>words = ["apple", "", "banana", "cherry", ""]

for word in words:
    if word == "":
        continue
    print(word)</code></pre>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">apple<br>banana<br>cherry</div>

          <h2><code>continue</code> versus <code>break</code></h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Statement</th><th>Effect</th><th>Use it when</th></tr></thead>
              <tbody>
                <tr><td><code>continue</code></td><td>Skips only the current iteration.</td><td>The loop should keep processing later items.</td></tr>
                <tr><td><code>break</code></td><td>Stops the entire loop immediately.</td><td>The required result has been found or processing must stop.</td></tr>
                <tr><td><code>pass</code></td><td>Does nothing.</td><td>A syntactic placeholder is needed for unfinished code.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Common mistakes</h2>
          <ul>
            <li>Put the condition before <code>continue</code> so only the intended values are skipped.</li>
            <li>In a <code>while</code> loop, update the counter before continuing.</li>
            <li>Remember that <code>continue</code> skips the rest of the current iteration, not the complete loop.</li>
            <li>Use clear conditions so readers can understand why an item is being ignored.</li>
          </ul>
          } @else if (topic.slug === 'python-while-loop') {
          <h2>What is a Python <code>while</code> loop?</h2>
          <p>A <code>while</code> loop repeats an indented block as long as its condition is true. It is useful when the number of iterations is not known in advance, such as reading input until it is valid or processing work until a queue is empty.</p>

          <h2>Syntax and execution flow</h2>
          <pre><code>while condition:
    # code runs while condition is True
    update_state()</code></pre>
          <ol>
            <li>Python evaluates the condition.</li>
            <li>If it is true, Python runs the indented body.</li>
            <li>The loop state changes.</li>
            <li>Python evaluates the condition again.</li>
            <li>The loop ends when the condition becomes false.</li>
          </ol>

          <h2>Simple <code>while</code> loop</h2>
          <p>Always make sure the loop state can change. Otherwise, the condition may remain true forever:</p>
          <pre><code>counter = 0

while counter &lt; 5:
    print(counter, "Hello")
    counter += 1</code></pre>
          <div class="output-box">0 Hello<br>1 Hello<br>2 Hello<br>3 Hello<br>4 Hello</div>

          <h2>Repeating until user input is valid</h2>
          <p>A <code>while</code> loop is useful when the program should keep asking until the user enters an acceptable value:</p>
          <pre><code>password = ""

while len(password) &lt; 8:
    password = input("Enter at least 8 characters: ")

print("Password length is valid")</code></pre>
          <p>In production code, also handle input limits, cancellation, and validation rules appropriate to the application.</p>

          <h2>Calculating a sum with a <code>while</code> loop</h2>
          <pre><code>number = 1
total = 0

while number &lt;= 15:
    total += number * number
    number += 1

print(total)</code></pre>
          <div class="output-box">1240</div>

          <h2>Finding numbers divisible by 5 or 7</h2>
          <pre><code>number = 1

while number &lt;= 50:
    if number % 5 == 0 or number % 7 == 0:
        print(number, end=" ")
    number += 1</code></pre>
          <div class="output-box">5 7 10 14 15 20 21 25 28 30 35 40 42 45 49</div>

          <h2>Checking prime numbers</h2>
          <p>A number is prime when it is greater than one and has no divisors other than one and itself. The loop below checks possible divisors up to the square root of the number:</p>
          <pre><code>def is_prime(number):
    if number &lt; 2:
        return False

    divisor = 2
    while divisor * divisor &lt;= number:
        if number % divisor == 0:
            return False
        divisor += 1
    return True

numbers = [34, 23, 75, 11]
for number in numbers:
    print(number, is_prime(number))</code></pre>
          <div class="output-box">34 False<br>23 True<br>75 False<br>11 True</div>

          <h2>Checking an Armstrong number</h2>
          <p>An Armstrong number is equal to the sum of its digits raised to the power of the number of digits. The digit count matters; raising every digit only to the power of one is not a general Armstrong-number test:</p>
          <pre><code>number = 153
original = number
digits = len(str(number))
total = 0

while number &gt; 0:
    digit = number % 10
    total += digit ** digits
    number //= 10

if total == original:
    print("Armstrong number")
else:
    print("Not an Armstrong number")</code></pre>
          <div class="output-box">Armstrong number</div>

          <h2>Creating a multiplication table</h2>
          <pre><code>number = 21
counter = 1

while counter &lt;= 10:
    print(number, "x", counter, "=", number * counter)
    counter += 1</code></pre>
          <div class="output-box">21 x 1 = 21<br>21 x 2 = 42<br>21 x 3 = 63<br>21 x 4 = 84<br>21 x 5 = 105<br>21 x 6 = 126<br>21 x 7 = 147<br>21 x 8 = 168<br>21 x 9 = 189<br>21 x 10 = 210</div>

          <h2>Using <code>break</code></h2>
          <p><code>break</code> immediately exits the nearest <code>while</code> loop:</p>
          <pre><code>counter = 0

while counter &lt; 8:
    if counter == 4:
        print("Stopping at", counter)
        break
    print("Counter:", counter)
    counter += 1</code></pre>
          <div class="output-box">Counter: 0<br>Counter: 1<br>Counter: 2<br>Counter: 3<br>Stopping at 4</div>

          <h2>Using <code>continue</code></h2>
          <p><code>continue</code> skips the remaining statements in the current iteration. Update the counter before continuing so the loop cannot get stuck:</p>
          <pre><code>counter = 0

while counter &lt; 8:
    counter += 1
    if counter == 4:
        continue
    print(counter)</code></pre>
          <div class="output-box">1<br>2<br>3<br>5<br>6<br>7<br>8</div>

          <h2>Using <code>pass</code></h2>
          <p><code>pass</code> is a placeholder. It does not skip the iteration or stop the loop:</p>
          <pre><code>counter = 0

while counter &lt; 5:
    if counter == 2:
        pass
    print(counter)
    counter += 1</code></pre>
          <div class="output-box">0<br>1<br>2<br>3<br>4</div>

          <h2>Using <code>else</code> with a <code>while</code> loop</h2>
          <p>The <code>else</code> block runs when the loop condition becomes false naturally. It is skipped when <code>break</code> exits the loop:</p>
          <pre><code>counter = 0

while counter &lt; 3:
    print(counter)
    counter += 1
else:
    print("Loop completed successfully")</code></pre>
          <div class="output-box">0<br>1<br>2<br>Loop completed successfully</div>

          <h2>Infinite loops</h2>
          <p>An infinite loop occurs when its condition never becomes false. This may be intentional for a service loop, but it should always have a safe exit or shutdown mechanism:</p>
          <pre><code>counter = 0

while True:
    print(counter)
    counter += 1
    if counter == 3:
        break</code></pre>
          <p>Do not use <code>while True</code> accidentally. Check that every normal path updates the state or reaches a <code>break</code>.</p>

          <h2>Common mistakes</h2>
          <ul>
            <li>Forgetting to update the counter or condition value.</li>
            <li>Using <code>continue</code> before the update, which can create an infinite loop.</li>
            <li>Using <code>break</code> when you only need to skip one iteration.</li>
            <li>Writing a condition that can never become false.</li>
            <li>Using a <code>for</code> loop when iterating over a known collection would be clearer.</li>
          </ul>

          <h2>Best practices</h2>
          <ul>
            <li>Initialize the loop state before the loop starts.</li>
            <li>Keep the condition simple and easy to verify.</li>
            <li>Update the loop state in one obvious place.</li>
            <li>Use helper functions for complex validation or processing.</li>
            <li>Test boundary cases such as zero, empty input, negative numbers, and the first value that should stop the loop.</li>
          </ul>
          } @else if (topic.slug === 'python-for-loop') {
          <h2>What is a Python <code>for</code> loop?</h2>
          <p>A <code>for</code> loop processes items from an iterable one at a time. It runs the indented block once for each item and stops automatically when there are no more items.</p>

          <h2>Syntax of a <code>for</code> loop</h2>
          <pre><code>for item in iterable:
    # code runs once for each item
    print(item)</code></pre>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Part</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td><code>for</code></td><td>Starts the loop.</td></tr>
                <tr><td><code>item</code></td><td>Name that receives the current value.</td></tr>
                <tr><td><code>in</code></td><td>Connects the loop variable to the iterable.</td></tr>
                <tr><td><code>iterable</code></td><td>Object that can be visited, such as a list, string, tuple, set, dictionary, or range.</td></tr>
                <tr><td><code>:</code> and indentation</td><td>Define the block executed for each item.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>How the loop works</h2>
          <ol>
            <li>Python obtains the next item from the iterable.</li>
            <li>It assigns that item to the loop variable.</li>
            <li>It runs the indented loop body.</li>
            <li>It repeats until the iterable is exhausted.</li>
          </ol>
          <pre><code>for number in range(1, 6):
    print(number)</code></pre>
          <div class="output-box">1<br>2<br>3<br>4<br>5</div>

          <h2>Iterating over common data types</h2>
          <p>A <code>for</code> loop can visit characters in a string, items in a list or tuple, and keys or key-value pairs in a dictionary:</p>
          <pre><code>for character in "Python":
    print(character)

cars = ["Tata", "Honda", "BMW"]
for car in cars:
    print(car)

student = &#123;"name": "Asha", "experience": 8&#125;
for key, value in student.items():
    print(key, value)</code></pre>
          <p>Use <code>.items()</code> when a dictionary loop needs both the key and its value. A dictionary loop without <code>.items()</code> visits keys only.</p>

          <h2>Using <code>range()</code></h2>
          <p><code>range()</code> is useful when a loop needs a sequence of numbers. The stop value is exclusive:</p>
          <pre><code>for number in range(3):
    print(number)

for number in range(2, 6):
    print(number)

for number in range(10, 4, -2):
    print(number)</code></pre>
          <p>The three forms are <code>range(stop)</code>, <code>range(start, stop)</code>, and <code>range(start, stop, step)</code>.</p>

          <h2>Using <code>enumerate()</code> for indexes</h2>
          <p>Use <code>enumerate()</code> when you need both an item and its position. It is clearer than manually indexing a list:</p>
          <pre><code>fruits = ["apple", "banana", "orange"]

for index, fruit in enumerate(fruits, start=1):
    print(index, fruit)</code></pre>
          <div class="output-box">1 apple<br>2 banana<br>3 orange</div>

          <h2>Example: calculate a factorial</h2>
          <p>A factorial multiplies every positive integer up to a number. The factorial of <code>0</code> is also <code>1</code>; negative numbers do not have a factorial in this example:</p>
          <pre><code>number = 5
factorial = 1

if number &lt; 0:
    print("Factorial is not defined for negative numbers")
else:
    for value in range(2, number + 1):
        factorial *= value
    print(factorial)</code></pre>
          <div class="output-box">120</div>

          <h2>Nested <code>for</code> loops</h2>
          <p>A nested <code>for</code> loop places one loop inside another. The inner loop completes for every item processed by the outer loop:</p>
          <pre><code>matrix = [
    [13, 4, 27],
    [22, 16, 8],
    [5, 11, 19]
]

for row in matrix:
    for value in row:
        print(value, end=" ")
    print()</code></pre>
          <div class="output-box">13 4 27<br>22 16 8<br>5 11 19</div>
          <p>Nested loops are useful for matrices, grids, and tables, but their cost increases as the data grows.</p>

          <h2>Printing a pattern with nested loops</h2>
          <pre><code>rows = 5

for row in range(1, rows + 1):
    for star in range(row):
        print("*", end=" ")
    print()</code></pre>
          <div class="output-box">*<br>* *<br>* * *<br>* * * *<br>* * * * *</div>

          <h2>Using <code>break</code></h2>
          <p><code>break</code> stops the nearest loop immediately. It is useful when a search has found the required item:</p>
          <pre><code>cars = ["Tata", "Honda", "Mahindra", "BMW"]

for car in cars:
    if car == "Mahindra":
        break
    print(car)</code></pre>
          <div class="output-box">Tata<br>Honda</div>

          <h2>Using <code>continue</code></h2>
          <p><code>continue</code> skips the rest of the current iteration and starts the next iteration:</p>
          <pre><code>cars = ["Tata", "Honda", "Mahindra", "BMW"]

for car in cars:
    if car == "Mahindra":
        continue
    print(car)</code></pre>
          <div class="output-box">Tata<br>Honda<br>BMW</div>

          <h2>Using <code>pass</code></h2>
          <p><code>pass</code> does nothing. It is a placeholder when a block must contain a statement but the implementation will be added later:</p>
          <pre><code>for number in range(1, 6):
    if number % 3 == 0:
        pass
    else:
        print(number)</code></pre>
          <div class="output-box">1<br>2<br>4<br>5</div>

          <h2>Using <code>else</code> with a <code>for</code> loop</h2>
          <p>The loop <code>else</code> block runs when the loop finishes normally. It does not run when <code>break</code> exits the loop:</p>
          <pre><code>numbers = [2, 4, 6]

for number in numbers:
    if number % 2 != 0:
        print("Odd number found")
        break
else:
    print("All numbers are even")</code></pre>
          <div class="output-box">All numbers are even</div>

          <h2>Searching for a value</h2>
          <pre><code>users = ["Asha", "Ravi", "Mina"]
target = "Ravi"

for user in users:
    if user == target:
        print("User found")
        break
else:
    print("User not found")</code></pre>
          <div class="output-box">User found</div>

          <h2>Best practices for <code>for</code> loops</h2>
          <ul>
            <li>Iterate directly over items instead of using indexes when the index is not needed.</li>
            <li>Use <code>enumerate()</code> when both the index and item are required.</li>
            <li>Use descriptive loop variables such as <code>student</code> instead of vague names.</li>
            <li>Keep the loop body small and move reusable logic into a function.</li>
            <li>Use <code>break</code> for early exit and <code>continue</code> to skip known exceptions.</li>
            <li>Be careful with nested loops because their runtime can grow quickly.</li>
          </ul>
          } @else if (topic.slug === 'python-loops') {
          <h2>What are Python loops?</h2>
          <p>Loops repeat a block of code so you can process multiple values or perform a task until a condition changes. They reduce duplicated code and are useful for collections, validation, calculations, and repeated work.</p>

          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Loop</th><th>Best suited for</th></tr></thead>
              <tbody>
                <tr><td><code>for</code></td><td>Iterating over an iterable such as a list, string, tuple, set, dictionary, or <code>range()</code>.</td></tr>
                <tr><td><code>while</code></td><td>Repeating while a condition remains true when the number of iterations is not known in advance.</td></tr>
                <tr><td>Nested loop</td><td>Processing one sequence inside another, such as rows and columns in a grid.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Python <code>for</code> loop</h2>
          <p>A <code>for</code> loop takes one item at a time from an iterable and assigns it to the loop variable:</p>
          <pre><code>for number in range(1, 6):
    print(number)</code></pre>
          <div class="output-box">1<br>2<br>3<br>4<br>5</div>
          <p>The loop body is identified by indentation. The value of <code>number</code> changes on each iteration.</p>

          <h2>Iterating over sequences</h2>
          <p>A <code>for</code> loop can visit the items in a string, list, tuple, set, or dictionary:</p>
          <pre><code>for character in "Python":
    print(character)

languages = ["Python", "Java", "SQL"]
for language in languages:
    print(language)

student = &#123;"name": "Asha", "experience": 8&#125;
for key, value in student.items():
    print(key, value)</code></pre>
          <p>Iterating directly over items is usually clearer than managing indexes manually. Dictionary iteration uses keys by default; use <code>.items()</code> when both keys and values are needed.</p>

          <h2>Using <code>range()</code></h2>
          <p><code>range()</code> creates a sequence of numbers without storing every number as a list. Its stop value is exclusive:</p>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Form</th><th>Values produced</th></tr></thead>
              <tbody>
                <tr><td><code>range(stop)</code></td><td>Starts at 0 and stops before <code>stop</code>.</td></tr>
                <tr><td><code>range(start, stop)</code></td><td>Starts at <code>start</code> and stops before <code>stop</code>.</td></tr>
                <tr><td><code>range(start, stop, step)</code></td><td>Moves by <code>step</code>, which can be negative.</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>print(list(range(5)))
print(list(range(2, 6)))
print(list(range(10, 4, -2)))</code></pre>
          <div class="output-box">[0, 1, 2, 3, 4]<br>[2, 3, 4, 5]<br>[10, 8, 6]</div>

          <h2>Getting an index with <code>enumerate()</code></h2>
          <p>Use <code>enumerate()</code> when you need both the position and the item. It is more readable than looping over <code>range(len(items))</code>:</p>
          <pre><code>fruits = ["apple", "banana", "orange"]

for index, fruit in enumerate(fruits, start=1):
    print(index, fruit)</code></pre>
          <div class="output-box">1 apple<br>2 banana<br>3 orange</div>

          <h2>Python <code>while</code> loop</h2>
          <p>A <code>while</code> loop repeats as long as its condition is true. Update the state used by the condition so the loop can eventually finish:</p>
          <pre><code>counter = 1

while counter &lt;= 5:
    print(counter)
    counter += 1</code></pre>
          <div class="output-box">1<br>2<br>3<br>4<br>5</div>
          <p>Use a <code>while</code> loop for tasks such as retrying input, processing items until a queue is empty, or reading data until an end condition is reached.</p>

          <h2><code>else</code> with loops</h2>
          <p>Python allows an <code>else</code> block after both <code>for</code> and <code>while</code> loops. The <code>else</code> block runs when the loop finishes normally. It does not run when the loop exits through <code>break</code>:</p>
          <pre><code>numbers = [2, 4, 6]

for number in numbers:
    if number % 2 != 0:
        print("Odd number found")
        break
else:
    print("All numbers are even")</code></pre>
          <div class="output-box">All numbers are even</div>
          <p>This pattern is useful when searching for an item and needing a clear action when no item matches.</p>

          <h2>Nested loops</h2>
          <p>A nested loop is a loop inside another loop. The inner loop completes its iterations for every iteration of the outer loop:</p>
          <pre><code>for row in range(1, 4):
    for column in range(1, 4):
        print(row, column)
    print("row complete")</code></pre>
          <p>Nested loops are useful for grids and tables, but their work grows quickly. For large data sets, look for a more efficient algorithm or a library operation.</p>

          <h2>Loop control statements</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Statement</th><th>Effect</th></tr></thead>
              <tbody>
                <tr><td><code>break</code></td><td>Stops the nearest enclosing loop immediately.</td></tr>
                <tr><td><code>continue</code></td><td>Skips the rest of the current iteration and starts the next one.</td></tr>
                <tr><td><code>pass</code></td><td>Does nothing; it acts as a placeholder where a statement is required.</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>for number in range(1, 6):
    if number == 2:
        continue
    if number == 5:
        break
    print(number)

for number in range(3):
    if number == 1:
        pass
    print("iteration", number)</code></pre>
          <div class="output-box">1<br>3<br>iteration 0<br>iteration 1<br>iteration 2</div>

          <h2>Infinite loops</h2>
          <p>An infinite loop never reaches a false condition. It is usually caused by forgetting to update the loop state:</p>
          <pre><code>counter = 0

while counter &lt; 3:
    print(counter)
    counter += 1</code></pre>
          <p>The example is safe because <code>counter</code> changes on every iteration. Avoid an accidental <code>while True</code> loop unless it has a deliberate exit condition, such as <code>break</code>.</p>

          <h2>Searching with a loop</h2>
          <pre><code>users = ["Asha", "Ravi", "Mina"]
target = "Ravi"

for user in users:
    if user == target:
        print("User found")
        break
else:
    print("User not found")</code></pre>
          <div class="output-box">User found</div>

          <h2>Choosing the right loop</h2>
          <ul>
            <li>Use <code>for</code> when iterating over items or a known numeric range.</li>
            <li>Use <code>while</code> when a condition controls how long the work continues.</li>
            <li>Use <code>enumerate()</code> instead of manual index counters when you need positions.</li>
            <li>Use <code>break</code> to stop a search once the result is known.</li>
            <li>Use <code>continue</code> to skip invalid or unwanted items.</li>
            <li>Keep loop bodies small and extract repeated logic into functions.</li>
            <li>Check the condition and update step carefully to avoid infinite loops.</li>
          </ul>
          } @else if (topic.slug === 'python-boolean') {
          <h2>What is a Boolean in Python?</h2>
          <p>A Boolean is a value that represents one of two logical states: <code>True</code> or <code>False</code>. Comparisons, conditions, and validation checks produce Boolean results.</p>
          <p>Python's Boolean type is named <code>bool</code>. The values must start with capital letters. Lowercase <code>true</code> and <code>false</code> are ordinary names and will raise <code>NameError</code> unless they have been defined.</p>

          <h2>Creating Boolean values</h2>
          <pre><code>is_logged_in = True
has_permission = False

print(is_logged_in)
print(has_permission)
print(type(is_logged_in))</code></pre>
          <div class="output-box">True<br>False<br>&lt;class 'bool'&gt;</div>

          <h2>Boolean results from comparisons</h2>
          <p>Comparison operators return <code>True</code> or <code>False</code>:</p>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td><code>==</code></td><td>Equal to</td><td><code>8 == 8</code> → <code>True</code></td></tr>
                <tr><td><code>!=</code></td><td>Not equal to</td><td><code>8 != 5</code> → <code>True</code></td></tr>
                <tr><td><code>&lt;</code>, <code>&lt;=</code></td><td>Less than or less than or equal to</td><td><code>3 &lt;= 5</code> → <code>True</code></td></tr>
                <tr><td><code>&gt;</code>, <code>&gt;=</code></td><td>Greater than or greater than or equal to</td><td><code>10 &gt; 4</code> → <code>True</code></td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>age = 20
print(age >= 18)
print(age == 21)
print(age != 16)</code></pre>
          <div class="output-box">True<br>False<br>True</div>

          <h2>Boolean operators</h2>
          <p>Python provides three logical operators:</p>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Operator</th><th>Meaning</th><th>Result</th></tr></thead>
              <tbody>
                <tr><td><code>and</code></td><td>Logical AND</td><td>True only when both conditions are true.</td></tr>
                <tr><td><code>or</code></td><td>Logical OR</td><td>True when at least one condition is true.</td></tr>
                <tr><td><code>not</code></td><td>Logical NOT</td><td>Reverses a truth value.</td></tr>
              </tbody>
            </table>
          </div>

          <h3>The <code>and</code> operator</h3>
          <div class="table-responsive">
            <table class="table table-bordered align-middle"><thead><tr><th>A</th><th>B</th><th>A and B</th></tr></thead><tbody><tr><td>True</td><td>True</td><td>True</td></tr><tr><td>True</td><td>False</td><td>False</td></tr><tr><td>False</td><td>True</td><td>False</td></tr><tr><td>False</td><td>False</td><td>False</td></tr></tbody></table>
          </div>
          <pre><code>age = 25
has_id = True
print(age >= 18 and has_id)</code></pre>
          <div class="output-box">True</div>

          <h3>The <code>or</code> operator</h3>
          <div class="table-responsive">
            <table class="table table-bordered align-middle"><thead><tr><th>A</th><th>B</th><th>A or B</th></tr></thead><tbody><tr><td>True</td><td>True</td><td>True</td></tr><tr><td>True</td><td>False</td><td>True</td></tr><tr><td>False</td><td>True</td><td>True</td></tr><tr><td>False</td><td>False</td><td>False</td></tr></tbody></table>
          </div>
          <pre><code>is_admin = False
is_owner = True
print(is_admin or is_owner)</code></pre>
          <div class="output-box">True</div>

          <h3>The <code>not</code> operator</h3>
          <div class="table-responsive">
            <table class="table table-bordered align-middle"><thead><tr><th>A</th><th>not A</th></tr></thead><tbody><tr><td>True</td><td>False</td></tr><tr><td>False</td><td>True</td></tr></tbody></table>
          </div>
          <pre><code>has_error = False
print(not has_error)
print(not (6 > 1))</code></pre>
          <div class="output-box">True<br>False</div>

          <h2>Truthiness and the <code>bool()</code> function</h2>
          <p>Python can test any object in a Boolean context. The following values are falsy:</p>
          <ul>
            <li><code>False</code></li>
            <li><code>None</code></li>
            <li>Numeric zero values such as <code>0</code> and <code>0.0</code></li>
            <li>Empty strings and collections such as <code>""</code>, <code>[]</code>, <code>()</code>, and <code>&#123;&#125;</code></li>
          </ul>
          <p>Most other objects are truthy, including negative numbers and non-empty collections:</p>
          <pre><code>print(bool(0))
print(bool(1))
print(bool(""))
print(bool("Python"))
print(bool([]))
print(bool([1, 2]))
print(bool(None))</code></pre>
          <div class="output-box">False<br>True<br>False<br>True<br>False<br>True<br>False</div>

          <h2>Using Booleans in conditions</h2>
          <p>Use a Boolean expression directly in an <code>if</code> statement. You do not need to compare it with <code>True</code> explicitly:</p>
          <pre><code>has_items = True

if has_items:
    print("The cart contains products.")
else:
    print("The cart is empty.")</code></pre>
          <p>For a negative check, use <code>if not has_items:</code>. This is clearer than writing <code>if has_items == False:</code>.</p>

          <h2>Short-circuit evaluation</h2>
          <p>Python evaluates <code>and</code> and <code>or</code> from left to right and may stop as soon as the result is known. This can prevent unsafe or unnecessary work:</p>
          <pre><code>name = "Asha"

if name and name[0] == "A":
    print("The name starts with A.")</code></pre>
          <p>The second condition is evaluated only when <code>name</code> is non-empty, so indexing it is safe in this example.</p>

          <h2>Identity and equality are different</h2>
          <p>Use <code>==</code> to compare values. Use <code>is</code> to check whether two names refer to the same object. In particular, use <code>is None</code> when checking for <code>None</code>:</p>
          <pre><code>first = [1, 2]
second = first
third = [1, 2]

print(first == third)  # same values
print(first is second) # same object
print(first is third)  # different objects

result = None
print(result is None)</code></pre>
          <div class="output-box">True<br>True<br>False<br>True</div>

          <h2>Membership operators</h2>
          <p>Use <code>in</code> and <code>not in</code> to test whether a value exists in a string, list, tuple, set, or dictionary:</p>
          <pre><code>languages = ["Python", "Java", "SQL"]

print("Python" in languages)
print("Go" not in languages)
print("Py" in "Python")</code></pre>
          <div class="output-box">True<br>True<br>True</div>

          <h2>Boolean values and integers</h2>
          <p>In Python, <code>bool</code> is a subclass of <code>int</code>. Therefore, <code>True</code> behaves like <code>1</code> and <code>False</code> behaves like <code>0</code> in numeric contexts:</p>
          <pre><code>print(True == 1)
print(False == 0)
print(True + True)
print(False + 5)</code></pre>
          <div class="output-box">True<br>True<br>2<br>5</div>
          <p>Although this behavior is valid, use explicit conversions when it improves readability.</p>

          <h2>Common mistakes</h2>
          <ul>
            <li>Write <code>True</code> and <code>False</code> with capital first letters.</li>
            <li>Use <code>==</code> for value comparison and <code>is</code> mainly for identity checks such as <code>is None</code>.</li>
            <li>Do not use <code>if value == True</code> when <code>if value</code> communicates the intent clearly.</li>
            <li>Remember that an empty string or collection is falsy, while a non-empty string such as <code>"False"</code> is truthy.</li>
            <li>Use parentheses when combining complex conditions so the intended precedence is clear.</li>
          </ul>
          } @else if (topic.slug === 'python-string-methods') {
          <h2>What are Python string methods?</h2>
          <p>String methods are operations provided by Python's built-in <code>str</code> type. They help you search, validate, split, format, and transform text. Strings are immutable, so these methods return a new value and leave the original string unchanged.</p>

          <h2>Case-conversion methods</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Method</th><th>Purpose</th><th>Example result</th></tr></thead>
              <tbody>
                <tr><td><code>upper()</code></td><td>Converts letters to uppercase.</td><td><code>"python".upper()</code> → <code>"PYTHON"</code></td></tr>
                <tr><td><code>lower()</code></td><td>Converts letters to lowercase.</td><td><code>"PYTHON".lower()</code> → <code>"python"</code></td></tr>
                <tr><td><code>title()</code></td><td>Capitalizes the first letter of each word.</td><td><code>"learn python".title()</code></td></tr>
                <tr><td><code>capitalize()</code></td><td>Capitalizes the first character only.</td><td><code>"python".capitalize()</code></td></tr>
                <tr><td><code>swapcase()</code></td><td>Switches uppercase letters to lowercase and vice versa.</td><td><code>"PyThOn".swapcase()</code></td></tr>
                <tr><td><code>casefold()</code></td><td>Performs stronger lowercase conversion for case-insensitive comparisons.</td><td><code>"Python".casefold()</code></td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>text = "i love learning python"

print(text.upper())
print(text.lower())
print(text.title())
print(text.capitalize())
print("PyThOn".swapcase())</code></pre>
          <p>Each call creates a result; <code>text</code> itself is not changed.</p>

          <h2>Searching and finding text</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Method</th><th>Behavior when text is found</th><th>Behavior when text is missing</th></tr></thead>
              <tbody>
                <tr><td><code>find(sub)</code></td><td>Returns the first index.</td><td>Returns <code>-1</code>.</td></tr>
                <tr><td><code>index(sub)</code></td><td>Returns the first index.</td><td>Raises <code>ValueError</code>.</td></tr>
                <tr><td><code>rfind(sub)</code></td><td>Returns the last index.</td><td>Returns <code>-1</code>.</td></tr>
                <tr><td><code>rindex(sub)</code></td><td>Returns the last index.</td><td>Raises <code>ValueError</code>.</td></tr>
                <tr><td><code>count(sub)</code></td><td>Counts non-overlapping occurrences.</td><td>Returns <code>0</code>.</td></tr>
                <tr><td><code>startswith(prefix)</code></td><td colspan="2">Returns <code>True</code> when the string begins with the prefix.</td></tr>
                <tr><td><code>endswith(suffix)</code></td><td colspan="2">Returns <code>True</code> when the string ends with the suffix.</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>text = "Python programming with Python"

print(text.find("Python"))
print(text.rfind("Python"))
print(text.count("Python"))
print(text.startswith("Python"))
print(text.endswith("Python"))
print(text.find("Java"))</code></pre>
          <div class="output-box">0<br>25<br>2<br>True<br>True<br>-1</div>
          <p>Use <code>find()</code> when a missing substring is expected. Use <code>index()</code> only when a missing value represents an error that should be handled.</p>

          <h2>Splitting and joining strings</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Method</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><code>split(separator, maxsplit)</code></td><td>Splits from the left and returns a list.</td></tr>
                <tr><td><code>rsplit(separator, maxsplit)</code></td><td>Splits from the right and returns a list.</td></tr>
                <tr><td><code>splitlines()</code></td><td>Splits text at line boundaries.</td></tr>
                <tr><td><code>partition(separator)</code></td><td>Returns a three-item tuple: before, separator, and after.</td></tr>
                <tr><td><code>rpartition(separator)</code></td><td>Performs partitioning from the right.</td></tr>
                <tr><td><code>separator.join(iterable)</code></td><td>Combines strings using the separator.</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>text = "Learning Python is practical"

print(text.split())
print(text.rsplit(" ", 2))
print(text.partition("Python"))
print(", ".join(["Python", "Java", "SQL"]))</code></pre>
          <p>The values passed to <code>join()</code> must be strings. Convert numeric values before joining them.</p>

          <h2>Removing and replacing text</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Method</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><code>strip(chars)</code></td><td>Removes matching characters from both ends; whitespace is removed when no argument is supplied.</td></tr>
                <tr><td><code>lstrip(chars)</code></td><td>Removes matching characters from the left.</td></tr>
                <tr><td><code>rstrip(chars)</code></td><td>Removes matching characters from the right.</td></tr>
                <tr><td><code>replace(old, new, count)</code></td><td>Returns a copy with selected occurrences replaced.</td></tr>
                <tr><td><code>removeprefix(prefix)</code></td><td>Removes a prefix when it is present.</td></tr>
                <tr><td><code>removesuffix(suffix)</code></td><td>Removes a suffix when it is present.</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>text = "   Python programming   "

print(text.strip())
print(text.lstrip())
print(text.rstrip())
print(text.replace("programming", "development"))
print("Python: ".removeprefix("Python: "))
print("notes.txt".removesuffix(".txt"))</code></pre>
          <p>The <code>chars</code> argument in <code>strip()</code> is a set of characters, not a complete substring. Use <code>removeprefix()</code> or <code>removesuffix()</code> when removing an exact prefix or suffix.</p>

          <h2>String validation methods</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Method</th><th>Returns <code>True</code> when...</th></tr></thead>
              <tbody>
                <tr><td><code>isalpha()</code></td><td>All characters are alphabetic and the string is not empty.</td></tr>
                <tr><td><code>isdigit()</code></td><td>All characters are digits.</td></tr>
                <tr><td><code>isdecimal()</code></td><td>All characters are decimal characters.</td></tr>
                <tr><td><code>isalnum()</code></td><td>All characters are alphabetic or numeric.</td></tr>
                <tr><td><code>isspace()</code></td><td>All characters are whitespace.</td></tr>
                <tr><td><code>islower()</code> / <code>isupper()</code></td><td>All cased characters use the requested case.</td></tr>
                <tr><td><code>istitle()</code></td><td>The string follows title-case rules.</td></tr>
                <tr><td><code>isidentifier()</code></td><td>The text is a valid Python identifier.</td></tr>
                <tr><td><code>isascii()</code></td><td>All characters are ASCII characters.</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>values = ["Welcome", "PYTHON", "123", "Python3", "   "]

for value in values:
    print(value, value.isalpha(), value.isdigit(), value.isalnum(), value.isspace())</code></pre>
          <p>Validation methods are useful for checking simple input rules, but more complex formats such as email addresses usually need dedicated validation logic.</p>

          <h2>Alignment and formatting methods</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Method</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><code>center(width, fillchar)</code></td><td>Centers text within a field.</td></tr>
                <tr><td><code>ljust(width, fillchar)</code></td><td>Aligns text to the left.</td></tr>
                <tr><td><code>rjust(width, fillchar)</code></td><td>Aligns text to the right.</td></tr>
                <tr><td><code>zfill(width)</code></td><td>Adds zeros to the left, preserving a sign when present.</td></tr>
                <tr><td><code>format()</code> and f-strings</td><td>Insert values and apply formatting rules.</td></tr>
              </tbody>
            </table>
          </div>
          <pre><code>text = "Python"
print(text.ljust(10, "-"))
print(text.rjust(10, "-"))
print(text.center(10, "-"))
print("1243".zfill(6))

name = "Asha"
score = 91.456
print(f"&#123;name&#125; scored &#123;score:.2f&#125;")</code></pre>
          <div class="output-box">Python----<br>----Python<br>--Python--<br>001243<br>Asha scored 91.46</div>

          <h2>Encoding and decoding</h2>
          <p><code>encode()</code> converts a string to bytes using an encoding such as UTF-8. The corresponding <code>decode()</code> method converts those bytes back to a string:</p>
          <pre><code>text = "café"
encoded = text.encode("utf-8")
decoded = encoded.decode("utf-8")

print(encoded)
print(decoded)</code></pre>
          <p>Use the same compatible encoding when encoding and decoding. UTF-8 is a common choice because it supports a wide range of Unicode characters.</p>

          <h2>Additional useful string methods</h2>
          <ul>
            <li><code>expandtabs(tabsize)</code> replaces tab characters with spaces.</li>
            <li><code>translate(table)</code> replaces characters according to a translation table.</li>
            <li><code>maketrans()</code> creates a translation table for <code>translate()</code>.</li>
            <li><code>format_map(mapping)</code> formats a string using a mapping of names to values.</li>
            <li><code>isprintable()</code> checks whether all characters can be displayed.</li>
            <li><code>isnumeric()</code> checks for Unicode numeric characters.</li>
          </ul>

          <h2>Best practices</h2>
          <ul>
            <li>Remember that string methods return new strings; assign the result when you need to keep it.</li>
            <li>Use <code>join()</code> for combining many strings efficiently.</li>
            <li>Use <code>find()</code> when a missing value is valid and <code>index()</code> when it should be an error.</li>
            <li>Use <code>casefold()</code> for robust case-insensitive comparisons across languages.</li>
            <li>Use explicit encodings when reading and writing files.</li>
            <li>Validate user input before using it in a business rule or database query.</li>
          </ul>
          } @else if (topic.slug === 'type-casting') {
          <h2>What is type casting in Python?</h2>
          <p>Type casting, also called type conversion, is the process of converting a value from one data type to another. It is useful when data comes from different sources or when an operation requires a particular type.</p>
          <p>Python is dynamically typed, so you do not declare a variable's type before assigning a value. Python still checks the types of objects at runtime, and incompatible operations can raise an error.</p>

          <h2>Implicit and explicit conversion</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Kind</th><th>Who performs it?</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td>Implicit conversion</td><td>Python performs it automatically when the conversion is safe.</td><td><code>5 + 2.5</code> produces a <code>float</code>.</td></tr>
                <tr><td>Explicit conversion</td><td>The programmer calls a conversion function.</td><td><code>int("42")</code> produces an <code>int</code>.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Implicit type conversion</h2>
          <p>Python can promote an integer to a float or complex number during an expression. This helps prevent accidental loss of information:</p>
          <pre><code>integer_value = 5
float_value = 7.6
complex_value = 3 + 4j

float_result = integer_value + float_value
complex_result = integer_value + float_value + complex_value

print(float_result, type(float_result))
print(complex_result, type(complex_result))</code></pre>
          <div class="output-box">12.6 &lt;class 'float'&gt;<br>(15.6+4j) &lt;class 'complex'&gt;</div>
          <p>Python does not automatically convert a float to an integer because that could discard the fractional part. It also does not implicitly convert arbitrary text to a number.</p>

          <h2>Common explicit conversion functions</h2>
          <div class="table-responsive">
            <table class="table table-bordered align-middle">
              <thead><tr><th>Function</th><th>Purpose</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td><code>int()</code></td><td>Converts a compatible value to an integer.</td><td><code>int("14")</code> → <code>14</code></td></tr>
                <tr><td><code>float()</code></td><td>Converts a compatible value to a floating-point number.</td><td><code>float("21.73")</code> → <code>21.73</code></td></tr>
                <tr><td><code>complex()</code></td><td>Creates a complex number from a real value or real and imaginary parts.</td><td><code>complex(8)</code> → <code>8+0j</code></td></tr>
                <tr><td><code>str()</code></td><td>Converts a value to its text representation.</td><td><code>str(25)</code> → <code>"25"</code></td></tr>
                <tr><td><code>bool()</code></td><td>Converts a value to <code>True</code> or <code>False</code>.</td><td><code>bool(1)</code> → <code>True</code></td></tr>
                <tr><td><code>list()</code>, <code>tuple()</code>, <code>set()</code></td><td>Converts an iterable to a collection type.</td><td><code>list("cat")</code> → <code>["c", "a", "t"]</code></td></tr>
                <tr><td><code>dict()</code></td><td>Builds a dictionary from key-value pairs or a mapping.</td><td><code>dict([("language", "Python")])</code></td></tr>
              </tbody>
            </table>
          </div>

          <h2>Converting values to integers</h2>
          <p>The <code>int()</code> function converts compatible integers, numeric strings, and floating-point values. When converting a float, it truncates the fractional part toward zero:</p>
          <pre><code>from_float = int(16.8)
from_text = int("14")

print(from_float)
print(from_text)
print(type(from_text))</code></pre>
          <div class="output-box">16<br>14<br>&lt;class 'int'&gt;</div>
          <p>Use <code>round()</code> when rounding is required. For example, <code>round(16.8)</code> returns <code>17</code>; <code>int(16.8)</code> returns <code>16</code>.</p>

          <h2>Converting values to floats</h2>
          <p>Use <code>float()</code> to convert an integer or a numeric string to a floating-point value:</p>
          <pre><code>from_integer = float(19)
from_text = float("21.73")

print(from_integer)
print(from_text)
print(type(from_text))</code></pre>
          <div class="output-box">19.0<br>21.73<br>&lt;class 'float'&gt;</div>

          <h2>Converting values to complex numbers</h2>
          <p>The <code>complex()</code> function can convert a real value to a complex number or accept separate real and imaginary parts:</p>
          <pre><code>first = complex(5)
second = complex(8.9)
third = complex(3, 4)

print(first)
print(second)
print(third)</code></pre>
          <div class="output-box">(5+0j)<br>(8.9+0j)<br>(3+4j)</div>

          <h2>Converting values to strings</h2>
          <p>The <code>str()</code> function creates a text representation of a value. This is useful when building messages or combining converted values with text:</p>
          <pre><code>age = 25
message = "Age: " + str(age)

print(message)
print(type(message))</code></pre>
          <div class="output-box">Age: 25<br>&lt;class 'str'&gt;</div>
          <p>In modern Python, an f-string is often clearer when inserting values into text:</p>
          <pre><code>name = "Asha"
age = 25
print(f"&#123;name&#125; is &#123;age&#125; years old")</code></pre>

          <h2>Boolean conversion and truthy values</h2>
          <p><code>bool()</code> returns <code>False</code> for values such as <code>0</code>, <code>0.0</code>, an empty string, an empty collection, and <code>None</code>. Most other values are truthy:</p>
          <pre><code>print(bool(0))
print(bool(""))
print(bool("Python"))
print(bool([]))
print(bool([1, 2]))</code></pre>
          <div class="output-box">False<br>False<br>True<br>False<br>True</div>
          <p>This behavior is why collections can be used directly in conditions such as <code>if items:</code>.</p>

          <h2>Converting collections</h2>
          <p>Collection conversion functions consume an iterable. A string becomes a sequence of characters, and a set removes duplicate values:</p>
          <pre><code>letters = list("cat")
coordinates = tuple([10, 20])
unique_values = set([1, 1, 2, 3])
mapping = dict([("language", "Python")])

print(letters)
print(coordinates)
print(unique_values)
print(mapping)</code></pre>
          <p>Be aware that sets are unordered and remove duplicates. A dictionary conversion requires data that can be interpreted as key-value pairs.</p>

          <h2>Converting user input</h2>
          <p><code>input()</code> always returns a string, even when the user enters digits. Convert the value before using it in a numeric calculation:</p>
          <pre><code>age_text = input("Enter your age: ")
age = int(age_text)
print(age + 1)</code></pre>
          <p>Real applications should handle invalid input with <code>try</code> and <code>except</code>:</p>
          <pre><code>try:
    age = int(input("Enter your age: "))
    print(age + 1)
except ValueError:
    print("Please enter a whole number.")</code></pre>

          <h2>Common type-casting errors</h2>
          <ul>
            <li><code>int("3.5")</code> raises <code>ValueError</code>; convert to <code>float</code> first if decimal text is expected.</li>
            <li><code>int("Python")</code> cannot convert arbitrary text to a number.</li>
            <li><code>int(4.9)</code> truncates to <code>4</code>; it does not round.</li>
            <li>Converting a value to <code>bool</code> checks whether it is empty or zero, not whether its text says “true”.</li>
            <li>Some conversions lose information, so keep the original value when precision matters.</li>
          </ul>

          <h2>Best practices</h2>
          <ul>
            <li>Convert values at the boundary of your program, such as immediately after reading user input.</li>
            <li>Validate external data and handle <code>ValueError</code> when conversion can fail.</li>
            <li>Use <code>Decimal</code> for exact decimal calculations instead of relying on binary floats.</li>
            <li>Choose conversion functions intentionally and document conversions that may lose precision.</li>
          </ul>
          } @else if (topic.slug === 'python-comments') {
          <h2>What are comments in Python?</h2>
          <p>Comments are notes written alongside source code for people who read and maintain the program. The Python interpreter ignores ordinary comments during execution, so they do not change the program’s result.</p>

          <h2>1. Single-line comments</h2>
          <p>Start a comment with the hash character, <code>#</code>. Everything after the hash on that line is treated as a comment:</p>
          <pre><code># Display a welcome message
print("Welcome to Python")</code></pre>
          <p>Use comments to explain why code exists, a business rule, or a non-obvious decision. Avoid comments that simply repeat the code.</p>

          <h2>2. Inline comments</h2>
          <p>An inline comment appears after a statement. Keep it short and leave enough space so the code remains easy to scan:</p>
          <pre><code>timeout = 30  # seconds allowed for the request
print(timeout)</code></pre>
          <p>Too many inline comments can make a line difficult to read. If the explanation is long, place it above the statement or improve the name of the variable.</p>

          <h2>3. Multiline comments</h2>
          <p>Python does not have a separate multiline-comment syntax. The clearest approach is to use a hash on every line:</p>
          <pre><code># This calculation uses the customer’s
# approved discount and keeps the final
# amount greater than or equal to zero.</code></pre>
          <p>Most editors can add or remove the hash from several selected lines at once.</p>

          <h2>Are triple quotes comments?</h2>
          <p>Triple-quoted text uses a multiline string literal, not a true comment. A standalone string that is not assigned may be discarded after it is evaluated, but it is still a string and can add unnecessary work or confuse documentation tools. Use <code>#</code> for comments.</p>
          <pre><code>"""This is a string literal, not a normal comment."""

print("Continue running")</code></pre>

          <h2>4. Docstrings</h2>
          <p>A docstring is a string placed as the first statement in a module, class, function, or method. Python stores it as documentation and exposes it through <code>__doc__</code> and tools such as <code>help()</code>:</p>
          <pre><code>def add(first, second):
    """Return the sum of two numbers."""
    return first + second

print(add.__doc__)
help(add)</code></pre>
          <p>Docstrings should describe the public purpose, parameters, return value, raised exceptions, or important usage rules. They are part of the program’s documentation and can be used by IDEs and documentation generators.</p>

          <h2>Comments versus docstrings</h2>
          <div class="table-responsive"><table><thead><tr><th>Feature</th><th>Comment</th><th>Docstring</th></tr></thead><tbody>
            <tr><td>Syntax</td><td>Starts with <code>#</code></td><td>String as the first statement in a module, class, or function</td></tr>
            <tr><td>Stored at runtime</td><td>No</td><td>Yes, through <code>__doc__</code></td></tr>
            <tr><td>Main purpose</td><td>Explain implementation or decisions</td><td>Document a public object’s behavior and usage</td></tr>
            <tr><td>Used by <code>help()</code></td><td>No</td><td>Yes</td></tr>
          </tbody></table></div>

          <h2>Good commenting practices</h2>
          <ul>
            <li>Write comments for intent and reasoning, not for obvious syntax.</li>
            <li>Keep comments accurate when the code changes.</li>
            <li>Use clear names so fewer explanatory comments are needed.</li>
            <li>Use docstrings for reusable functions, classes, modules, and public APIs.</li>
            <li>Remove temporary debugging comments before committing production code.</li>
            <li>Do not put passwords, tokens, personal data, or secret configuration in comments.</li>
          </ul>

          <h2>Example with comments and a docstring</h2>
          <pre><code>def calculate_total(price, quantity):
    """Return the total price for a quantity of items."""
    # Validate the input before performing the calculation.
    if quantity &lt; 0:
        raise ValueError("quantity cannot be negative")
    return price * quantity

print(calculate_total(25, 3))</code></pre>
          <p>The docstring explains the function’s public purpose, while the inline comment explains a decision inside the implementation.</p>
          } @else if (topic.slug === 'python-operators') {
          <h2>What are Python operators?</h2>
          <p>Operators are symbols or words that perform an operation on one or more values. The values being operated on are called operands. For example, in <code>total = price + tax</code>, <code>+</code> adds two operands and <code>=</code> assigns the result to <code>total</code>.</p>

          <h2>Types of Python operators</h2>
          <div class="table-responsive"><table><thead><tr><th>Category</th><th>Operators</th><th>Typical use</th></tr></thead><tbody>
            <tr><td>Arithmetic</td><td><code>+ - * / // % **</code></td><td>Calculations with numbers.</td></tr>
            <tr><td>Comparison</td><td><code>== != &lt; &lt;= &gt; &gt;=</code></td><td>Compare values and produce a Boolean result.</td></tr>
            <tr><td>Assignment</td><td><code>= += -= *= /= //= %= **=</code></td><td>Assign or update a variable.</td></tr>
            <tr><td>Logical</td><td><code>and or not</code></td><td>Combine or reverse conditions.</td></tr>
            <tr><td>Bitwise</td><td><code>&amp; | ^ ~ &lt;&lt; &gt;&gt;</code></td><td>Operate on the bits of integers.</td></tr>
            <tr><td>Membership</td><td><code>in not in</code></td><td>Check whether a value exists in a collection.</td></tr>
            <tr><td>Identity</td><td><code>is is not</code></td><td>Check whether two names refer to the same object.</td></tr>
          </tbody></table></div>

          <h2>1. Arithmetic operators</h2>
          <div class="table-responsive"><table><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead><tbody>
            <tr><td><code>+</code></td><td>Addition</td><td><code>15 + 4</code></td><td><code>19</code></td></tr>
            <tr><td><code>-</code></td><td>Subtraction</td><td><code>15 - 4</code></td><td><code>11</code></td></tr>
            <tr><td><code>*</code></td><td>Multiplication</td><td><code>15 * 4</code></td><td><code>60</code></td></tr>
            <tr><td><code>/</code></td><td>True division</td><td><code>15 / 4</code></td><td><code>3.75</code></td></tr>
            <tr><td><code>//</code></td><td>Floor division</td><td><code>15 // 4</code></td><td><code>3</code></td></tr>
            <tr><td><code>%</code></td><td>Remainder</td><td><code>15 % 4</code></td><td><code>3</code></td></tr>
            <tr><td><code>**</code></td><td>Exponentiation</td><td><code>2 ** 3</code></td><td><code>8</code></td></tr>
          </tbody></table></div>
          <pre><code>a = 15
b = 4
print(a + b)
print(a / b)
print(a // b)
print(a % b)
print(2 ** 3)</code></pre>
          <p>Python’s <code>/</code> operator returns a floating-point result. Floor division rounds down, which is important for negative values as well as positive values.</p>

          <h2>2. Comparison operators</h2>
          <div class="table-responsive"><table><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>==</code></td><td>Equal to</td><td><code>age == 18</code></td></tr>
            <tr><td><code>!=</code></td><td>Not equal to</td><td><code>status != "closed"</code></td></tr>
            <tr><td><code>&lt;</code></td><td>Less than</td><td><code>score &lt; 50</code></td></tr>
            <tr><td><code>&lt;=</code></td><td>Less than or equal to</td><td><code>items &lt;= 10</code></td></tr>
            <tr><td><code>&gt;</code></td><td>Greater than</td><td><code>price &gt; 100</code></td></tr>
            <tr><td><code>&gt;=</code></td><td>Greater than or equal to</td><td><code>score &gt;= 50</code></td></tr>
          </tbody></table></div>
          <p>Comparison expressions normally produce <code>True</code> or <code>False</code> and are commonly used in conditions:</p>
          <pre><code>score = 72
if score &gt;= 50:
    print("Pass")</code></pre>

          <h2>3. Assignment operators</h2>
          <p>The basic assignment operator stores a value. Augmented assignment combines an operation with assignment:</p>
          <div class="table-responsive"><table><thead><tr><th>Operator</th><th>Equivalent form</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>=</code></td><td>Assign</td><td><code>total = 10</code></td></tr>
            <tr><td><code>+=</code></td><td><code>total = total + 5</code></td><td><code>total += 5</code></td></tr>
            <tr><td><code>-=</code></td><td><code>total = total - 5</code></td><td><code>total -= 5</code></td></tr>
            <tr><td><code>*=</code></td><td><code>total = total * 5</code></td><td><code>total *= 5</code></td></tr>
            <tr><td><code>/=</code></td><td><code>total = total / 5</code></td><td><code>total /= 5</code></td></tr>
            <tr><td><code>//=</code></td><td><code>total = total // 5</code></td><td><code>total //= 5</code></td></tr>
            <tr><td><code>%=</code></td><td><code>total = total % 5</code></td><td><code>total %= 5</code></td></tr>
            <tr><td><code>**=</code></td><td><code>total = total ** 5</code></td><td><code>total **= 5</code></td></tr>
          </tbody></table></div>

          <h2>4. Logical operators</h2>
          <div class="table-responsive"><table><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>and</code></td><td>True when both expressions are truthy.</td><td><code>age &gt;= 18 and active</code></td></tr>
            <tr><td><code>or</code></td><td>True when at least one expression is truthy.</td><td><code>admin or owner</code></td></tr>
            <tr><td><code>not</code></td><td>Reverses a truth value.</td><td><code>not completed</code></td></tr>
          </tbody></table></div>
          <p>Python’s logical operators use short-circuit evaluation. For example, the right side of <code>and</code> may not run if the left side is already false.</p>

          <h2>5. Bitwise operators</h2>
          <p>Bitwise operators work on the binary representation of integers. They are useful for flags, masks, permissions, and low-level protocols.</p>
          <div class="table-responsive"><table><thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>&amp;</code></td><td>Bitwise AND</td><td><code>6 &amp; 3</code></td></tr>
            <tr><td><code>|</code></td><td>Bitwise OR</td><td><code>6 | 3</code></td></tr>
            <tr><td><code>^</code></td><td>Bitwise XOR</td><td><code>6 ^ 3</code></td></tr>
            <tr><td><code>~</code></td><td>Bitwise inversion</td><td><code>~6</code></td></tr>
            <tr><td><code>&lt;&lt;</code></td><td>Shift bits left</td><td><code>6 &lt;&lt; 1</code></td></tr>
            <tr><td><code>&gt;&gt;</code></td><td>Shift bits right</td><td><code>6 &gt;&gt; 1</code></td></tr>
          </tbody></table></div>

          <h2>6. Membership operators</h2>
          <p><code>in</code> and <code>not in</code> test whether a value is contained in a string, list, tuple, set, or dictionary. For a dictionary, membership checks keys by default:</p>
          <pre><code>languages = ["Python", "Java"]
print("Python" in languages)
print("Go" not in languages)

student = &#123;"name": "Asha"&#125;
print("name" in student)</code></pre>

          <h2>7. Identity operators</h2>
          <p><code>is</code> and <code>is not</code> test whether two names refer to the same object. They are different from <code>==</code>, which compares values:</p>
          <pre><code>first = [1, 2]
second = [1, 2]
same = first

print(first == second)  # True: values are equal
print(first is second)  # False: different list objects
print(first is same)    # True: same object</code></pre>
          <p>Use <code>is None</code> and <code>is not None</code> for <code>None</code>. Use <code>==</code> when you want to compare ordinary values.</p>

          <h2>Operator precedence</h2>
          <p>Precedence determines which operation is evaluated first. Parentheses make the intended order clear and are recommended when an expression could be misunderstood.</p>
          <div class="table-responsive"><table><thead><tr><th>Higher priority</th><th>Operators</th></tr></thead><tbody>
            <tr><td>1</td><td><code>**</code></td></tr>
            <tr><td>2</td><td>Unary <code>+x</code>, <code>-x</code>, <code>~x</code></td></tr>
            <tr><td>3</td><td><code>* / // %</code></td></tr>
            <tr><td>4</td><td><code>+ -</code></td></tr>
            <tr><td>5</td><td><code>&lt;&lt; &gt;&gt;</code></td></tr>
            <tr><td>6</td><td><code>&amp;</code>, then <code>^</code>, then <code>|</code></td></tr>
            <tr><td>7</td><td>Comparisons, <code>in</code>, <code>is</code></td></tr>
            <tr><td>8</td><td><code>not</code>, then <code>and</code>, then <code>or</code></td></tr>
          </tbody></table></div>
          <pre><code>result = (10 + 5) * 2
print(result)</code></pre>

          <h2>Operator best practices</h2>
          <ul>
            <li>Use parentheses when they improve readability.</li>
            <li>Use <code>==</code> for value comparison and <code>is</code> mainly for identity checks such as <code>None</code>.</li>
            <li>Be careful when mixing strings and numbers; convert values explicitly when needed.</li>
            <li>Use bitwise operators only when the bit-level behavior is intentional and documented.</li>
          </ul>
          } @else if (topic.slug === 'python-literals') {
          <h2>What are literals in Python?</h2>
          <p>A literal is a value written directly in Python source code. The number <code>42</code>, the text <code>"Python"</code>, and the Boolean value <code>True</code> are all literals. A variable is a name that refers to a value; the literal is the value itself.</p>
          <pre><code>count = 42
language = "Python"
ready = True
missing = None</code></pre>

          <h2>Types of Python literals</h2>
          <div class="table-responsive"><table><thead><tr><th>Literal category</th><th>Examples</th><th>Used for</th></tr></thead><tbody>
            <tr><td>Numeric</td><td><code>10</code>, <code>3.14</code>, <code>2 + 3j</code></td><td>Whole numbers, decimal values, and complex numbers.</td></tr>
            <tr><td>String</td><td><code>"Hello"</code>, <code>'Python'</code></td><td>Text and character data.</td></tr>
            <tr><td>Boolean</td><td><code>True</code>, <code>False</code></td><td>Truth values used in conditions.</td></tr>
            <tr><td>Collection</td><td><code>[1, 2]</code>, <code>(1, 2)</code></td><td>Groups of values such as lists and tuples.</td></tr>
            <tr><td>Special</td><td><code>None</code></td><td>Represents the absence of a value.</td></tr>
          </tbody></table></div>

          <h2>Numeric literals</h2>
          <p>Numeric literals create <code>int</code>, <code>float</code>, or <code>complex</code> values. Python integers can grow beyond the size commonly supported by a fixed-width integer type, subject to available memory.</p>

          <h3>Integer literals</h3>
          <div class="table-responsive"><table><thead><tr><th>Number system</th><th>Prefix</th><th>Example</th><th>Decimal value</th></tr></thead><tbody>
            <tr><td>Decimal</td><td>None</td><td><code>25</code></td><td>25</td></tr>
            <tr><td>Binary</td><td><code>0b</code> or <code>0B</code></td><td><code>0b11001</code></td><td>25</td></tr>
            <tr><td>Octal</td><td><code>0o</code> or <code>0O</code></td><td><code>0o31</code></td><td>25</td></tr>
            <tr><td>Hexadecimal</td><td><code>0x</code> or <code>0X</code></td><td><code>0x19</code></td><td>25</td></tr>
          </tbody></table></div>
          <pre><code>decimal_number = 25
binary_number = 0b11001
hex_number = 0x19
print(decimal_number, binary_number, hex_number)</code></pre>

          <h3>Floating-point and complex literals</h3>
          <p>A floating-point literal contains a decimal point or an exponent. A complex literal uses <code>j</code> or <code>J</code> for its imaginary part:</p>
          <pre><code>price = 19.95
large_value = 2.5e3       # 2500.0
complex_value = 2 + 3j
print(price, large_value, complex_value)</code></pre>
          <p>Binary floating-point values are approximations, so use <code>decimal.Decimal</code> when exact decimal arithmetic is required, such as for some financial calculations.</p>

          <h2>String literals</h2>
          <p>String literals represent text and can use single quotes, double quotes, or triple quotes. Choose a quoting style that keeps the text readable:</p>
          <pre><code>single = 'Python'
double = "Programming"
multi_line = """This text
uses more than one line."""
print(single, double)
print(multi_line)</code></pre>

          <h3>Escape sequences</h3>
          <div class="table-responsive"><table><thead><tr><th>Sequence</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>\\n</code></td><td>New line</td><td><code>"Hello\\nPython"</code></td></tr>
            <tr><td><code>\\t</code></td><td>Tab</td><td><code>"Name:\\tAsha"</code></td></tr>
            <tr><td><code>\\'</code></td><td>Single quote inside a single-quoted string</td><td><code>'It\\'s'</code></td></tr>
            <tr><td><code>\\"</code></td><td>Double quote inside a double-quoted string</td><td><code>"Say \\"Hi\\""</code></td></tr>
            <tr><td><code>\\\\</code></td><td>Backslash</td><td><code>"C:\\\\Python"</code></td></tr>
          </tbody></table></div>

          <h3>Formatted string literals</h3>
          <p>F-strings insert expressions into text using an <code>f</code> prefix:</p>
          <pre><code>name = "Asha"
score = 92
print(f"&#123;name&#125; scored &#123;score&#125;")</code></pre>

          <h2>Boolean literals</h2>
          <p>Python has two Boolean literals: <code>True</code> and <code>False</code>. They are commonly produced by comparisons and used by <code>if</code> statements:</p>
          <pre><code>is_adult = age &gt;= 18
if is_adult:
    print("Access allowed")</code></pre>
          <p>Use the exact capitalized spellings. <code>true</code> and <code>false</code> are not Python Boolean literals.</p>

          <h2>Collection literals</h2>
          <div class="table-responsive"><table><thead><tr><th>Collection</th><th>Literal syntax</th><th>Important behavior</th></tr></thead><tbody>
            <tr><td>List</td><td><code>[10, 20, 30]</code></td><td>Ordered and mutable; duplicates are allowed.</td></tr>
            <tr><td>Tuple</td><td><code>(10, 20, 30)</code></td><td>Ordered and immutable; useful for fixed groups of values.</td></tr>
            <tr><td>Dictionary</td><td><code>&#123;"name": "Asha"&#125;</code></td><td>Maps keys to values; keys must be hashable.</td></tr>
            <tr><td>Set</td><td><code>&#123;10, 20, 30&#125;</code></td><td>Stores unique values without relying on position.</td></tr>
          </tbody></table></div>
          <pre><code>numbers = [10, 20, 30]
coordinates = (12.9, 77.6)
student = &#123;"name": "Asha", "level": 1&#125;
unique_numbers = &#123;10, 20, 20, 30&#125;
print(numbers, coordinates, student, unique_numbers)</code></pre>
          <p>An empty list is <code>[]</code>, an empty dictionary is <code>&#123;&#125;</code>, and an empty set must be created with <code>set()</code> because <code>&#123;&#125;</code> means an empty dictionary.</p>

          <h2>The special literal <code>None</code></h2>
          <p><code>None</code> represents “no value” or “not available yet.” It is not the same as zero, an empty string, or <code>False</code>. Check it with identity comparison:</p>
          <pre><code>result = None
if result is None:
    print("No result is available")</code></pre>

          <h2>Literals and mutability</h2>
          <p>Writing a literal creates a value, but whether that value can be changed depends on its type. Lists, sets, and dictionaries are mutable; numbers, strings, tuples, and Boolean values are immutable. Assigning a new value to a variable changes what the name refers to; it does not change an immutable value in place.</p>

          <h2>Common mistakes</h2>
          <ul>
            <li>Using <code>true</code>, <code>false</code>, or <code>NULL</code> instead of <code>True</code>, <code>False</code>, or <code>None</code>.</li>
            <li>Using <code>&#123;&#125;</code> when an empty set was intended; use <code>set()</code>.</li>
            <li>Forgetting that input from <code>input()</code> is a string literal until it is converted.</li>
            <li>Comparing with <code>is</code> when value equality with <code>==</code> is required.</li>
          </ul>
          } @else if (topic.slug === 'python-keywords') {
          <h2>What are Python keywords?</h2>
          <p>Python keywords are reserved words with a special meaning in the language. They define program structure, control execution, handle exceptions, create functions and classes, and work with modules. You cannot normally use a keyword as a variable, function, or class name.</p>

          <h2>How to see the keywords in your Python version</h2>
          <p>The exact keyword list belongs to the Python interpreter you are using. Ask Python instead of relying on a copied list:</p>
          <pre><code>import keyword

print(keyword.kwlist)
print(keyword.softkwlist)</code></pre>
          <p><code>kwlist</code> contains hard keywords. <code>softkwlist</code> contains words that act like keywords only in particular syntax, such as pattern matching.</p>

          <h2>Python keyword reference</h2>

          <h3>Boolean and special values</h3>
          <div class="table-responsive"><table><thead><tr><th>Keyword</th><th>Beginner explanation</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>True</code></td><td>Boolean value representing a true condition.</td><td><code>active = True</code></td></tr>
            <tr><td><code>False</code></td><td>Boolean value representing a false condition.</td><td><code>is_valid = False</code></td></tr>
            <tr><td><code>None</code></td><td>Represents the absence of a value.</td><td><code>result = None</code></td></tr>
          </tbody></table></div>

          <h3>Conditions and logical expressions</h3>
          <div class="table-responsive"><table><thead><tr><th>Keyword</th><th>Purpose</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>if</code></td><td>Runs a block when a condition is true.</td><td><code>if score &gt;= 50:</code></td></tr>
            <tr><td><code>elif</code></td><td>Tests another condition when earlier conditions were false.</td><td><code>elif score == 0:</code></td></tr>
            <tr><td><code>else</code></td><td>Runs when no preceding condition matched.</td><td><code>else:</code></td></tr>
            <tr><td><code>and</code></td><td>Requires both expressions to be true.</td><td><code>age &gt;= 18 and active</code></td></tr>
            <tr><td><code>or</code></td><td>Requires at least one expression to be true.</td><td><code>admin or owner</code></td></tr>
            <tr><td><code>not</code></td><td>Reverses a Boolean result.</td><td><code>not completed</code></td></tr>
            <tr><td><code>is</code></td><td>Checks object identity, not ordinary value equality.</td><td><code>value is None</code></td></tr>
            <tr><td><code>in</code></td><td>Checks whether a value is contained in an iterable.</td><td><code>"py" in "python"</code></td></tr>
          </tbody></table></div>
          <pre><code>score = 72
if score &gt;= 90:
    grade = "A"
elif score &gt;= 50:
    grade = "Pass"
else:
    grade = "Try again"
print(grade)</code></pre>

          <h3>Loops and loop control</h3>
          <div class="table-responsive"><table><thead><tr><th>Keyword</th><th>Purpose</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>for</code></td><td>Iterates over values in an iterable.</td><td><code>for item in items:</code></td></tr>
            <tr><td><code>while</code></td><td>Repeats a block while a condition remains true.</td><td><code>while count &lt; 3:</code></td></tr>
            <tr><td><code>break</code></td><td>Stops the nearest loop immediately.</td><td><code>if found: break</code></td></tr>
            <tr><td><code>continue</code></td><td>Skips to the next loop iteration.</td><td><code>if ignored: continue</code></td></tr>
            <tr><td><code>pass</code></td><td>Does nothing; useful as a temporary placeholder.</td><td><code>class Draft: pass</code></td></tr>
          </tbody></table></div>

          <h3>Functions, generators, and classes</h3>
          <div class="table-responsive"><table><thead><tr><th>Keyword</th><th>Purpose</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>def</code></td><td>Defines a named function.</td><td><code>def greet():</code></td></tr>
            <tr><td><code>return</code></td><td>Sends a result back from a function.</td><td><code>return total</code></td></tr>
            <tr><td><code>yield</code></td><td>Produces a value from a generator and pauses its state.</td><td><code>yield number</code></td></tr>
            <tr><td><code>lambda</code></td><td>Creates a small anonymous function expression.</td><td><code>lambda x: x * 2</code></td></tr>
            <tr><td><code>class</code></td><td>Defines a class used to create objects.</td><td><code>class User:</code></td></tr>
          </tbody></table></div>
          <pre><code>def double(number):
    return number * 2

def numbers(limit):
    for number in range(limit):
        yield number

print(double(4))
print(list(numbers(3)))</code></pre>

          <h3>Exceptions and error handling</h3>
          <div class="table-responsive"><table><thead><tr><th>Keyword</th><th>Purpose</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>try</code></td><td>Marks code that may raise an exception.</td><td><code>try:</code></td></tr>
            <tr><td><code>except</code></td><td>Handles a matching exception.</td><td><code>except ValueError:</code></td></tr>
            <tr><td><code>finally</code></td><td>Runs cleanup code whether an exception occurred or not.</td><td><code>finally:</code></td></tr>
            <tr><td><code>raise</code></td><td>Raises an exception intentionally.</td><td><code>raise ValueError()</code></td></tr>
            <tr><td><code>assert</code></td><td>Checks an assumption and raises AssertionError when it is false.</td><td><code>assert total &gt;= 0</code></td></tr>
          </tbody></table></div>
          <pre><code>try:
    number = int(input("Number: "))
except ValueError:
    print("Enter a whole number")
else:
    print(number)
finally:
    print("Input attempt finished")</code></pre>

          <h3>Modules and imports</h3>
          <div class="table-responsive"><table><thead><tr><th>Keyword</th><th>Purpose</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>import</code></td><td>Loads a module.</td><td><code>import math</code></td></tr>
            <tr><td><code>from</code></td><td>Selects names from a module or package.</td><td><code>from math import pi</code></td></tr>
            <tr><td><code>as</code></td><td>Creates an alias for an imported name or exception.</td><td><code>import pandas as pd</code></td></tr>
          </tbody></table></div>

          <h3>Scope and namespaces</h3>
          <div class="table-responsive"><table><thead><tr><th>Keyword</th><th>Purpose</th><th>Guidance</th></tr></thead><tbody>
            <tr><td><code>global</code></td><td>Allows a function to rebind a module-level name.</td><td>Use sparingly; return values are usually clearer.</td></tr>
            <tr><td><code>nonlocal</code></td><td>Allows a nested function to rebind a name in its enclosing function.</td><td>Useful in closures, but avoid unnecessary shared state.</td></tr>
          </tbody></table></div>

          <h3>Context management and asynchronous code</h3>
          <div class="table-responsive"><table><thead><tr><th>Keyword</th><th>Purpose</th><th>Example</th></tr></thead><tbody>
            <tr><td><code>with</code></td><td>Uses a context manager to guarantee setup and cleanup.</td><td><code>with open(path) as file:</code></td></tr>
            <tr><td><code>async</code></td><td>Defines an asynchronous function or context.</td><td><code>async def fetch():</code></td></tr>
            <tr><td><code>await</code></td><td>Waits for an awaitable inside asynchronous code.</td><td><code>result = await fetch()</code></td></tr>
          </tbody></table></div>

          <h2>Soft keywords: match and case</h2>
          <p><code>match</code> and <code>case</code> are soft keywords. They act as keywords in structural pattern matching but can be used as ordinary names in other contexts:</p>
          <pre><code>value = 2
match value:
    case 1:
        print("One")
    case 2:
        print("Two")</code></pre>

          <h2>Helpful rules for beginners</h2>
          <ul>
            <li>Do not use a keyword as a variable or function name.</li>
            <li>Use <code>==</code> to compare values and <code>is None</code> to check for the singleton <code>None</code>.</li>
            <li>Catch specific exceptions instead of using a broad, silent <code>except</code>.</li>
            <li>Use <code>with</code> for resources such as files that must be closed.</li>
            <li>Run <code>keyword.kwlist</code> when you need the list for a particular Python installation.</li>
          </ul>
          } @else if (topic.slug === 'python-syntax') {
          <h2>What is Python syntax?</h2>
          <p>Python syntax is the set of rules that tells the interpreter how to read a program. It covers statements, expressions, indentation, names, comments, strings, operators, and the way blocks of code are organized.</p>
          <p>Python syntax is intentionally readable, but it is still precise. A missing colon, mismatched quote, or incorrect indentation can prevent a program from running.</p>

          <h2>Interactive mode</h2>
          <p>Interactive mode runs one instruction at a time. Start Python from a terminal by entering <code>python</code> or <code>python3</code>. The <code>&gt;&gt;&gt;</code> prompt means that the interpreter is ready for an expression:</p>
          <pre><code>&gt;&gt;&gt; print("Hello, Python!")
Hello, Python!
&gt;&gt;&gt; 2 + 3
5</code></pre>
          <p>This mode is useful for trying a function, checking a value, or learning how a standard-library method behaves.</p>

          <h2>Script mode</h2>
          <p>Script mode stores Python code in a file with the <code>.py</code> extension. Save this as <code>sample.py</code> and run it from the directory containing the file:</p>
          <pre><code>print("Hello from a Python script")</code></pre>
          <pre><code>python sample.py</code></pre>
          <p>Scripts are better than interactive commands when you want to save, test, reuse, and share a program.</p>

          <figure class="figure my-4">
            <img class="figure-img img-fluid rounded shadow-sm" src="/images/python/python-execution-flow.png" alt="Python source code passes through the interpreter and produces terminal output" loading="lazy">
            <figcaption class="figure-caption">A simple visual of how Python source code is interpreted and displayed as output.</figcaption>
          </figure>

          <h2>Variables and assignments</h2>
          <p>A variable is a name that refers to a value. Python does not require a type declaration before an assignment; the value determines the type at runtime:</p>
          <pre><code>count = 10
language = "Python"
print(count, type(count))
print(language, type(language))</code></pre>
          <p>Use descriptive names and remember that Python is case-sensitive. <code>total</code> and <code>Total</code> are different names.</p>

          <h2>Indentation defines code blocks</h2>
          <p>Python uses indentation instead of curly braces to show which statements belong to a function, condition, or loop. Four spaces are the usual convention. Statements in the same block must use consistent indentation:</p>
          <pre><code>score = 85
if score &gt;= 50:
    print("Pass")
    print("Continue learning")
print("Program finished")</code></pre>
          <p>The two indented statements belong to the <code>if</code> block. The final statement is not indented, so it runs after the block. Incorrect indentation can raise an <code>IndentationError</code> or change the program’s logic.</p>

          <h2>Identifiers and naming rules</h2>
          <p>Identifiers are names used for variables, functions, classes, modules, and other objects. A valid identifier can contain letters, digits, and underscores, but it cannot begin with a digit or be a reserved keyword.</p>
          <pre><code>student_name = "Asha"
exam_score2 = 92

class StudentRecord:
    pass</code></pre>
          <p>Use <code>snake_case</code> for variables and functions, and <code>PascalCase</code> for classes. Names should describe the value or behavior they represent.</p>

          <h2>Python keywords</h2>
          <p>Keywords have special meaning in Python and cannot be used as ordinary identifiers. Examples include <code>if</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>def</code>, <code>class</code>, <code>import</code>, <code>return</code>, <code>try</code>, and <code>with</code>.</p>
          <p>Python can show the keyword list for the installed interpreter:</p>
          <pre><code>import keyword
print(keyword.kwlist)</code></pre>

          <h2>Comments and docstrings</h2>
          <p>A comment begins with <code>#</code> and is ignored by the interpreter. Use comments to explain intent, decisions, or non-obvious behavior:</p>
          <pre><code># Calculate the total after applying the discount
total = price * quantity</code></pre>
          <p>Triple-quoted strings are string literals, not technically comments. When placed at the beginning of a module, class, or function, they become documentation strings, also called docstrings:</p>
          <pre><code>def add(first, second):
    """Return the sum of two numbers."""
    return first + second</code></pre>

          <h2>Multiline statements</h2>
          <p>Long expressions can be split across lines inside parentheses, brackets, or braces. This is usually clearer than using a backslash:</p>
          <pre><code>total = (
    25 + 58 + 92
    + 74 + 29
)
print(total)</code></pre>
          <p>A backslash can continue a line, but it is easier to make mistakes with trailing spaces. Prefer implicit continuation inside matching delimiters.</p>

          <h2>Reading input from the user</h2>
          <p>The <code>input()</code> function displays a prompt and returns the entered text as a string. Convert the value when a number is required:</p>
          <pre><code>name = input("Enter your name: ")
age = int(input("Enter your age: "))
print(f"Hello, &#123;name&#125;. You are &#123;age&#125; years old.")</code></pre>
          <p>Input can be invalid, so production programs should handle conversion errors and validate values before using them.</p>

          <h2>Common syntax mistakes</h2>
          <ul>
            <li>Forgetting the colon after <code>if</code>, <code>for</code>, <code>while</code>, <code>def</code>, or <code>class</code>.</li>
            <li>Mixing tabs and spaces in the same code block.</li>
            <li>Leaving a string quotation mark or parenthesis open.</li>
            <li>Using a keyword as a variable name.</li>
            <li>Assuming that <code>input()</code> returns an integer instead of a string.</li>
          </ul>

          <h2>Python syntax best practices</h2>
          <p>Use four spaces for indentation, keep functions small, choose descriptive names, add comments only where they add context, and format code consistently. These habits make Python programs easier to review, test, and maintain.</p>
          } @else if (topic.slug === 'hello-world-program') {
          <h2>What is the Hello World program?</h2>
          <p>Hello World is a small first program that displays a message. It is useful because beginners can write, run, and understand it without learning variables, classes, or external packages first.</p>

          <h2>Write your first Python program</h2>
          <p>Create a file named <code>hello.py</code> and add the following code:</p>
          <pre><code>print("Hello, World!")</code></pre>
          <p>Run the file from a terminal with <code>python hello.py</code>. On some systems, the command is <code>python3 hello.py</code>. The program prints:</p>
          <h6 class="mt-3 mb-1 text-muted">Output</h6>
          <div class="output-box">Hello, World!</div>

          <h2>How does the program work?</h2>
          <ul>
            <li><strong><code>print()</code>:</strong> A built-in Python function that writes values to the standard output.</li>
            <li><strong><code>"Hello, World!"</code>:</strong> A string literal containing the text passed to the function.</li>
            <li><strong>Parentheses:</strong> They contain the value supplied as the function argument.</li>
            <li><strong>New line:</strong> <code>print()</code> normally moves the cursor to the next line after displaying the value.</li>
          </ul>

          <h2>Add a comment</h2>
          <p>A comment begins with the <code>#</code> character. Python ignores the comment while running the program, so comments are useful for explaining intent:</p>
          <pre><code># Display a welcome message
print("Hello, World!")</code></pre>

          <h2>Print a message stored in a variable</h2>
          <p>Instead of passing the string directly, store it in a variable and print the variable:</p>
          <pre><code>message = "Hello, World!"
print(message)</code></pre>
          <p>Python determines the value’s type at runtime. Here, <code>message</code> refers to a string.</p>

          <h2>Use a function</h2>
          <p>A function gives a piece of behavior a reusable name. The indented line belongs to the function body:</p>
          <pre><code>def show_message():
    print("Hello, World!")

show_message()</code></pre>
          <p>The function is defined first and then called with <code>show_message()</code>.</p>

          <h2>Print several values</h2>
          <p><code>print()</code> accepts multiple values and separates them with spaces by default:</p>
          <pre><code>name = "Asha"
language = "Python"
print("Hello", name, "Welcome to", language)</code></pre>

          <h2>Important beginner concepts</h2>
          <ul>
            <li><strong>Indentation:</strong> Use consistent spaces to define blocks after statements such as <code>def</code>, <code>if</code>, and loops. Four spaces are the common convention.</li>
            <li><strong>Case sensitivity:</strong> <code>print</code> and <code>Print</code> are different names; only the lowercase built-in is correct.</li>
            <li><strong>File extension:</strong> Save Python source files with the <code>.py</code> extension.</li>
            <li><strong>Virtual environments:</strong> Use <code>python -m venv .venv</code> to isolate project packages when a project grows beyond the standard library.</li>
            <li><strong>Style:</strong> Use meaningful names, short functions, and consistent formatting. PEP 8 is the commonly followed Python style guide.</li>
          </ul>

          <h2>Common mistakes</h2>
          <ul>
            <li>Writing <code>Print()</code> instead of the case-sensitive <code>print()</code>.</li>
            <li>Leaving a quotation mark open in a string.</li>
            <li>Running the command from a directory that does not contain <code>hello.py</code>.</li>
            <li>Using inconsistent indentation when the code contains a function or another block.</li>
          </ul>

          <h2>Next steps</h2>
          <p>After Hello World, practice variables, data types, user input, operators, conditions, loops, and functions. These concepts form the foundation for useful Python scripts and applications.</p>
          } @else if (topic.slug === 'python-applications') {
          <h2>Where is Python used?</h2>
          <p>Python is used in many industries because it is readable, productive, and supported by libraries for specialized tasks. A team can use Python for a small script, a web API, a data pipeline, or an automation service without changing to a completely different language for every problem.</p>

          <h2>1. Web development</h2>
          <p>Python web frameworks provide routing, request handling, validation, authentication integrations, database access, and tools for building APIs. Django is a full-featured framework, Flask provides a lightweight foundation, and FastAPI is designed for modern API development with type-hint-based validation.</p>
          <p>Python web applications commonly use templates or frontend frameworks for the user interface and connect to databases through an ORM or a database driver. Framework features should be configured securely, especially authentication, permissions, input validation, and secret management.</p>

          <h2>2. Data science and scientific computing</h2>
          <p>Python is widely used to load, clean, transform, analyze, and visualize data. NumPy provides efficient numerical arrays, pandas provides tabular data tools, SciPy supports scientific calculations, and Matplotlib or Seaborn helps create visualizations.</p>
          <pre><code>import pandas as pd

sales = pd.DataFrame(&#123;
    "product": ["Book", "Pen"],
    "amount": [120, 45]
&#125;)
print(sales["amount"].sum())</code></pre>

          <h2>3. Data analytics and reporting</h2>
          <p>Analytics teams use Python to combine data sources, remove invalid values, calculate metrics, identify trends, and produce reports. A typical workflow includes loading data, validating it, transforming it, analyzing results, and presenting the findings in a dashboard or report.</p>

          <h2>4. Web scraping and data collection</h2>
          <p>Python can retrieve and parse public web content when collection is allowed. Requests is useful for HTTP calls, Beautiful Soup and lxml can parse HTML or XML, Scrapy supports larger crawling projects, and Selenium can automate browser interactions for pages that require JavaScript.</p>
          <p>Always respect a website’s terms, robots rules, access limits, privacy requirements, and copyright. Add timeouts, retries, rate limits, and error handling instead of sending uncontrolled traffic.</p>

          <h2>5. Automation and scripting</h2>
          <p>Python is excellent for repetitive work such as renaming files, generating reports, checking services, processing spreadsheets, calling APIs, and running scheduled jobs. Modules such as <code>pathlib</code>, <code>shutil</code>, <code>subprocess</code>, <code>csv</code>, and <code>json</code> help connect scripts to files and operating-system workflows.</p>

          <h2>6. Computer-aided design and 3D tools</h2>
          <p>Python is used to automate and extend design tools. Applications such as Blender and FreeCAD expose Python APIs for creating objects, applying transformations, generating repeated geometry, importing data, and building custom workflows. Python can speed up design automation, while the CAD application handles the visual modeling and rendering work.</p>

          <h2>7. Artificial intelligence</h2>
          <p>Artificial intelligence applications use Python for tasks such as natural-language processing, computer vision, speech processing, robotics, and generative systems. Python’s ecosystem makes it convenient to prepare data, call models, evaluate results, and connect AI components to web services.</p>

          <h2>8. Machine learning</h2>
          <p>Machine learning is a branch of AI in which algorithms learn patterns from data and use those patterns to classify, predict, rank, or recommend. scikit-learn is useful for many traditional models, while PyTorch and TensorFlow support deep-learning workflows.</p>
          <p>Real projects also require data quality checks, careful evaluation, monitoring, privacy controls, and protection against biased or misleading results. A library cannot replace a sound problem definition and reliable training data.</p>

          <h2>9. Game development</h2>
          <p>Pygame, Pygame Zero, and Arcade help beginners learn game loops, sprites, input handling, collision detection, and sound. Python is a good choice for learning and for many 2D prototypes, but high-performance 3D games often use engines and languages designed for demanding real-time graphics.</p>

          <h2>10. Networking</h2>
          <p>Network engineers use Python to automate device configuration, collect monitoring data, test connectivity, and manage infrastructure. Libraries such as Paramiko, Netmiko, and NAPALM can connect to network devices, but credentials, host-key checking, least privilege, and audit logging must be handled carefully.</p>

          <h2>11. Cybersecurity</h2>
          <p>Python supports defensive security work such as log analysis, vulnerability-report automation, incident-response tooling, packet analysis, and security testing in authorized environments. Scapy can construct and inspect packets, while Python scripts can connect security tools and produce repeatable reports.</p>
          <p>Security tools must only be used on systems where you have permission. Validate inputs, protect credentials, avoid storing sensitive data in logs, and test scripts in an isolated environment.</p>

          <h2>12. Testing and quality engineering</h2>
          <p>Python is used to test APIs, command-line tools, data pipelines, and user-facing applications. pytest, unittest, and browser-automation tools help teams detect regressions and verify behavior before software reaches users.</p>

          <h2>Choosing Python for a project</h2>
          <p>Python is a strong option when readability, development speed, automation, data processing, or ecosystem support matters. Before choosing it, consider runtime performance, memory usage, deployment environments, available packages, security requirements, and the skills of the team.</p>

          <h2>Conclusion</h2>
          <p>Python applications range from websites and APIs to data analysis, machine learning, automation, CAD scripting, games, networking, and cybersecurity tools. Start with a small, well-defined project, use the standard library where possible, and add external packages only when they provide clear value.</p>
          } @else if (topic.slug === 'history-of-python') {
          <h2>Who created Python?</h2>
          <p>Python was created by Guido van Rossum, a Dutch programmer. He began working on the language at Centrum Wiskunde &amp; Informatica (CWI) in the Netherlands. The project grew from his interest in building a practical scripting language that was easier to read and extend than many alternatives of the time.</p>

          <h2>How did Python begin?</h2>
          <p>Development started around the 1989 holiday period, and the first public Python release, version 0.9.0, appeared in February 1991. That release already included several ideas that shaped Python: functions, modules, exception handling, dynamic typing, and useful built-in data types.</p>
          <p>Python’s early design was influenced by ABC, a language developed at CWI. Guido wanted to keep the useful ideas while creating a language that was open to extension, practical for scripting, and comfortable to use for larger programs.</p>

          <h2>Why is it called Python?</h2>
          <p>The name comes from <em>Monty Python’s Flying Circus</em>, the British comedy series. Guido van Rossum wanted a name that was short, memorable, and slightly unusual. The name refers to the comedy show, not to the snake, although the snake is now a well-known part of Python’s visual identity.</p>

          <h2>Important goals behind Python</h2>
          <ul>
            <li><strong>Readable code:</strong> Syntax and indentation make the structure of a program easy to see.</li>
            <li><strong>Developer productivity:</strong> Built-in collections and a standard library reduce repetitive code.</li>
            <li><strong>Extensibility:</strong> Python can work with native extensions, operating-system tools, databases, and other languages.</li>
            <li><strong>Multiple programming styles:</strong> Developers can use procedural, object-oriented, and functional techniques.</li>
            <li><strong>Open development:</strong> A public community and open-source process allow people to improve the language and its ecosystem.</li>
          </ul>

          <h2>Python version timeline</h2>
          <div class="table-responsive">
            <table>
              <thead><tr><th>Version family</th><th>Period</th><th>What it introduced</th></tr></thead>
              <tbody>
                <tr><td>Python 0.9.0</td><td>1991</td><td>Early public release with functions, modules, exceptions, and dynamic typing.</td></tr>
                <tr><td>Python 1.x</td><td>1994–2000</td><td>Established the language’s core syntax, standard modules, and readability-focused design.</td></tr>
                <tr><td>Python 2.0</td><td>2000</td><td>Added features including list comprehensions, Unicode support, and cyclic garbage collection.</td></tr>
                <tr><td>Python 3.0</td><td>2008</td><td>Introduced a cleaner language design, a print function, improved division, and stronger Unicode behavior.</td></tr>
                <tr><td>Python 3.x</td><td>2008–present</td><td>Continues to receive language improvements, performance work, security fixes, and library updates.</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Python 2 and Python 3</h2>
          <p>Python 2 was widely used for many years, but it reached its official end of life on 1 January 2020. New applications should use Python 3 because Python 2 no longer receives normal security or maintenance updates.</p>
          <p>Python 3 made several intentional compatibility changes, including using <code>print()</code> as a function, making text and binary data distinct, and changing division behavior. These changes created a cleaner foundation for future development.</p>

          <h2>Recent Python development</h2>
          <p>Python continues to release a feature series followed by maintenance releases. Python 3.14 is the current feature series in this tutorial’s environment, and Python 3.14.6 was released on 10 June 2026. The 3.14 series includes improvements such as officially supported free-threaded builds, deferred annotation evaluation, template string literals, multiple interpreters in the standard library, and the new <code>compression.zstd</code> module.</p>
          <p>Release numbers change over time, so check the <a href="https://www.python.org/doc/versions/" target="_blank" rel="noopener noreferrer">official Python documentation by version</a> and the <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer">Python downloads page</a> before installing a runtime for a new project.</p>

          <h2>Python today</h2>
          <p>Python is now used for web services, automation, data analysis, scientific computing, artificial intelligence, testing, education, and software tooling. Its history explains why the language remains popular: it combines a small and readable core with a community-driven ecosystem that can grow with new types of applications.</p>
          } @else if (topic.slug === 'advantages-of-python') {
          <h2>Why do developers choose Python?</h2>
          <p>Python is a high-level, dynamically typed language that emphasizes readable code and fast development. Its simple syntax helps beginners start quickly, while its libraries, frameworks, and tooling support professional applications.</p>

          <h2>1. Easy to learn and use</h2>
          <p>Python uses familiar words, consistent indentation, and a small amount of punctuation. Beginners can focus on variables, conditions, loops, and functions instead of learning a large amount of boilerplate syntax first.</p>
          <pre><code>prices = [10, 20, 30]
total = sum(prices)
print(f"Total: &#123;total&#125;")</code></pre>

          <h2>2. Free and open source</h2>
          <p>Python is available under an open-source license. Developers can install it, study its implementation, use it in personal or commercial projects, and contribute to its ecosystem. Always review the license of third-party packages used by a particular project.</p>

          <h2>3. Rapid development and productivity</h2>
          <p>Python’s concise syntax and built-in data structures allow teams to create prototypes and working features quickly. A short feedback cycle is useful when requirements are changing or a developer needs to test an idea before investing in a larger implementation.</p>

          <h2>4. Helpful execution and debugging workflow</h2>
          <p>Python can be run interactively or as a script, which makes it convenient for experimentation. When an error occurs, Python reports an exception and traceback that identify the failure location and type. Developers should still use tests and proper error handling rather than relying only on manual debugging.</p>

          <h2>5. Extensive libraries and frameworks</h2>
          <p>Python’s standard library includes modules for files, operating-system tasks, JSON, CSV, mathematics, networking, dates, testing, and more. Third-party packages extend Python for web development, data science, machine learning, automation, databases, and user interfaces.</p>
          <ul>
            <li><strong>Web development:</strong> Django, Flask, and FastAPI</li>
            <li><strong>Data and science:</strong> NumPy, pandas, SciPy, and Matplotlib</li>
            <li><strong>Machine learning:</strong> scikit-learn, PyTorch, and TensorFlow</li>
            <li><strong>Automation and testing:</strong> Requests, Selenium, Beautiful Soup, and pytest</li>
          </ul>

          <h2>6. Dynamic typing with optional type hints</h2>
          <p>Python determines the type associated with a value at runtime, so simple programs do not need a type declaration for every variable. For larger codebases, developers can add type hints and use static analysis tools to document expected inputs and outputs.</p>
          <pre><code>def area(width: float, height: float) -&gt; float:
    return width * height</code></pre>

          <h2>7. Portability and cross-platform support</h2>
          <p>Python programs can usually run on Windows, macOS, and Linux with little source-code change. Portable applications should use tools such as <code>pathlib</code>, avoid hard-coded operating-system commands, and manage dependencies with a virtual environment.</p>

          <h2>8. Strong community and documentation</h2>
          <p>Python has a large community that produces documentation, tutorials, packages, conferences, and technical discussions. This gives learners multiple ways to understand a concept and helps teams find established solutions to common problems.</p>

          <h2>9. Integration and extensibility</h2>
          <p>Python can communicate with databases, web services, command-line tools, and operating-system APIs. When required, applications can also use native extensions or services written in another language for specialized capabilities or performance.</p>

          <h2>10. Versatility and flexibility</h2>
          <p>The same language can be used for a small automation script, a REST API, a data pipeline, a test suite, or a desktop utility. Python also supports procedural, object-oriented, and functional programming styles, allowing teams to choose an appropriate design.</p>

          <h2>11. Scalability with responsible design</h2>
          <p>Python applications can scale when they use clear module boundaries, caching, background workers, database indexes, observability, and efficient data structures. Large systems may combine Python with task queues, separate services, or optimized components where appropriate.</p>

          <h2>Important trade-offs</h2>
          <p>Python is not automatically the fastest or most memory-efficient choice for every workload. Dynamic typing can move some errors to runtime, and CPU-heavy tasks may require profiling, multiprocessing, optimized libraries, or another language for a critical component. Understanding these trade-offs helps developers use Python effectively.</p>

          <h2>Conclusion</h2>
          <p>Python’s main advantages are readability, development speed, portability, a large ecosystem, and broad community support. These strengths make it a practical choice for learning programming and building applications across many industries.</p>
          } @else if (topic.slug === 'python-features') {
          <h2>Overview of Python Features</h2>
          <p>Python is designed to help developers express ideas with less boilerplate. Its readable syntax is combined with dynamic typing, automatic memory management, a strong standard library, and a large ecosystem of third-party packages.</p>

          <h2>1. Free and open source</h2>
          <p>Python can be downloaded and used without a commercial license fee. Its source code and development process are publicly available, allowing the community to report issues, suggest improvements, and build compatible tools.</p>

          <h2>2. Readable and beginner-friendly syntax</h2>
          <p>Python uses indentation to show code blocks and avoids unnecessary punctuation. This makes the structure of a program visible and helps beginners concentrate on the problem they are solving.</p>
          <pre><code>def greet(name):
    return f"Hello, &#123;name&#125;!"

print(greet("Asha"))</code></pre>

          <h2>3. High-level and dynamically typed</h2>
          <p>Python hides low-level details such as manual memory allocation, so developers can work with business logic and data structures. It is dynamically typed, meaning a variable name can refer to values of different types during execution.</p>
          <pre><code>value = 10
print(type(value))

value = "ten"
print(type(value))</code></pre>
          <p>Dynamic typing is convenient, but clear naming, tests, and optional type hints are important in larger projects.</p>

          <h2>4. Object-oriented programming</h2>
          <p>Python supports classes, objects, inheritance, composition, and polymorphism. It also supports procedural programming with functions and functional techniques such as comprehensions, <code>map()</code>, and <code>filter()</code>. Developers can choose the style that best fits the problem.</p>

          <h2>5. Portable and cross-platform</h2>
          <p>Python is available for Windows, macOS, Linux, and other platforms. Most portable programs run without source-code changes, although file paths, operating-system commands, native dependencies, and environment variables should be handled carefully.</p>

          <h2>6. Interpreted execution</h2>
          <p>Python is commonly used through an interpreter. In CPython, source code is compiled to bytecode and executed by the Python virtual machine. This workflow supports fast experimentation and useful error messages, but it does not mean every Python program will be as fast as native machine-code applications.</p>

          <h2>7. Automatic memory management</h2>
          <p>Python manages object memory through its runtime. Developers create objects without manually allocating and freeing memory. Reference counting and cyclic garbage collection help reclaim objects that are no longer reachable, while good application design is still necessary to avoid retaining unnecessary data.</p>

          <h2>8. Extensive standard library</h2>
          <p>Python includes modules for many common tasks, reducing the need to build everything from scratch:</p>
          <ul>
            <li><strong>Files and operating systems:</strong> <code>pathlib</code>, <code>os</code>, and <code>shutil</code></li>
            <li><strong>Data formats:</strong> <code>json</code>, <code>csv</code>, and <code>sqlite3</code></li>
            <li><strong>Math and statistics:</strong> <code>math</code>, <code>statistics</code>, and <code>random</code></li>
            <li><strong>Concurrency:</strong> <code>threading</code>, <code>multiprocessing</code>, and <code>asyncio</code></li>
            <li><strong>Networking:</strong> <code>socket</code>, <code>http</code>, and <code>urllib</code></li>
          </ul>

          <h2>9. Large ecosystem of libraries and frameworks</h2>
          <p>Packages from the Python Package Index extend Python for specialized work. Django, Flask, and FastAPI are used for web applications and APIs. NumPy, pandas, Matplotlib, and SciPy support data work. PyTorch, TensorFlow, and scikit-learn support machine learning. Requests, Beautiful Soup, Selenium, and pytest are useful for integration, automation, and testing.</p>

          <h2>10. GUI and multimedia support</h2>
          <p>Python can create desktop and interactive applications with tools such as Tkinter, PySide, PyQt, wxPython, and Kivy. Pygame provides features for learning game development and building 2D multimedia projects.</p>

          <h2>11. Integration and extensibility</h2>
          <p>Python can call operating-system services, databases, web APIs, and native extensions. Components written in languages such as C or C++ can be exposed to Python when performance or access to an existing library is important.</p>

          <h2>12. Multipurpose programming</h2>
          <p>Python is suitable for many types of projects, including web applications, data processing, automation, scientific computing, testing, command-line tools, and educational software. The same readable language can be used for quick scripts and larger applications when the project is organized well.</p>

          <h2>13. Strong community support</h2>
          <p>Python has a large worldwide community that contributes documentation, open-source packages, tutorials, examples, and technical discussions. This makes it easier for developers to learn the language, find established solutions, and get help when troubleshooting a problem.</p>

          <h2>14. Multiple Programming Paradigms Support</h2>
          <p>Python supports more than one programming style. This flexibility lets developers choose an approach that matches the size and behavior of an application.</p>
          <h3>Procedural programming</h3>
          <p>Procedural code organizes a program as a sequence of statements and functions that operate on data. It is a natural choice for scripts, command-line tools, and small automation tasks.</p>
          <pre><code>def calculate_total(price, quantity):
    return price * quantity

print(calculate_total(25, 3))</code></pre>
          <h3>Object-oriented programming</h3>
          <p>Object-oriented Python groups state and behavior into classes and objects. Encapsulation, inheritance, composition, and polymorphism can help structure larger systems, but a class should be used when it makes the design clearer.</p>
          <h3>Functional programming</h3>
          <p>Python also provides functional features such as first-class functions, comprehensions, <code>map()</code>, <code>filter()</code>, and <code>functools.reduce()</code>. Python is not a purely functional language, so mutable state and ordinary loops remain valid choices when they make code easier to understand.</p>
          <pre><code>numbers = [1, 2, 3, 4]
squares = [number * number for number in numbers]
print(squares)</code></pre>

          <h2>15. Automatic Memory Management</h2>
          <p>Python manages memory for objects automatically. When a program creates a list, string, or custom object, Python’s memory manager reserves space for it. Developers normally do not call allocation and deallocation functions themselves.</p>
          <p>In CPython, reference counting tracks how many references point to an object. When an object is no longer reachable, its memory can be released. A cyclic garbage collector also helps detect groups of objects that reference one another but are no longer used.</p>
          <pre><code>class User:
    pass

user = User()       # an object is created
user = None         # the previous object may now be collectible</code></pre>
          <p>Automatic memory management does not remove every memory problem. Keeping unused objects in global collections, caches, or long-lived variables can still increase memory usage. Profiling and sensible object lifetimes are important in production applications.</p>

          <h2>16. Multithreading and Multiprocessing</h2>
          <p>Python offers several concurrency tools, but they solve different problems:</p>
          <ul>
            <li><strong>Multithreading:</strong> Multiple threads share one process and are useful for I/O-bound work such as network requests, file operations, and waiting for external services.</li>
            <li><strong>Multiprocessing:</strong> Multiple processes have separate memory spaces and are useful for CPU-intensive tasks such as image processing or large calculations.</li>
            <li><strong>Asyncio:</strong> Asynchronous functions cooperate through an event loop and are useful when one program manages many waiting I/O operations.</li>
          </ul>
          <pre><code>from concurrent.futures import ThreadPoolExecutor

def fetch_report(report_id):
    return f"Report &#123;report_id&#125; ready"

with ThreadPoolExecutor(max_workers=2) as pool:
    results = list(pool.map(fetch_report, [1, 2]))

print(results)</code></pre>
          <p>Choose concurrency based on the workload, the libraries being used, and how data is shared. Concurrency can improve responsiveness, but it also introduces concerns such as synchronization, cancellation, errors, and resource limits.</p>

          <h2>Things to consider</h2>
          <p>Python’s simplicity comes with trade-offs. Dynamic typing can move some errors to runtime, memory usage may be higher than a low-level implementation, and CPU-heavy code may need profiling or optimized extensions. Understanding these limitations helps developers choose Python responsibly.</p>

          <h2>Conclusion</h2>
          <p>Python’s most important strengths are readability, flexibility, portability, automatic memory management, and its extensive library ecosystem. These features make it suitable for learning, automation, web development, data applications, testing, and many other software projects.</p>
          } @else {
          <h2>{{ topic.title }} explained</h2>
          <p>
            This beginner-friendly Python lesson introduces <strong>{{ topic.title }}</strong> step by step.
            Python uses readable syntax, indentation, and a large standard library, so you can focus on solving problems.
          </p>
          @if (topic.slug === 'python-data-structures') {
            <figure class="figure my-4">
              <img class="figure-img img-fluid rounded shadow-sm" src="/images/python/python-data-structures.png" alt="Visual comparison of Python lists, tuples, sets, and dictionaries" loading="lazy">
              <figcaption class="figure-caption">A visual comparison of Python's four common collection types.</figcaption>
            </figure>
          }
          <h2>Example</h2>
          <p>Run this small example and change the values to see how the concept works:</p>
          <pre><code>{{ topic.example }}</code></pre>
          <h2>Key points</h2>
          <ul>
            <li>Read the example from top to bottom and pay attention to indentation.</li>
            <li>Try a small change, run the program again, and observe the result.</li>
            <li>Prefer clear names and small functions as your programs grow.</li>
          </ul>
          <p>
            For complete language details, compare this explanation with the
            <a href="https://docs.python.org/3/tutorial/" target="_blank" rel="noopener noreferrer">official Python tutorial</a>.
            The official tutorial covers Python control flow, data structures, modules, classes, exceptions,
            and file input and output.
          </p>
          }
        </div>

        <p class="pager-heading">Continue learning</p>
        <nav class="course-pager" aria-label="Python lesson navigation">
          @if (previousTopic) {
            <a class="pager-link previous" [routerLink]="['/', previousTopic.slug]">
              <span class="pager-direction"><i class="bi bi-arrow-left"></i> Previous</span>
              <strong>{{ previousTopic.title }}</strong>
            </a>
          } @else {
            <a class="pager-link previous" routerLink="/python-tutorial">
              <span class="pager-direction"><i class="bi bi-arrow-left"></i> Previous</span>
              <strong>Python Tutorial</strong>
            </a>
          }
          @if (nextTopic) {
            <a class="pager-link next" [routerLink]="['/', nextTopic.slug]">
              <span class="pager-direction">Next <i class="bi bi-arrow-right"></i></span>
              <strong>{{ nextTopic.title }}</strong>
            </a>
          }
        </nav>
      </article>
    } @else {
      <article class="container-xl py-5"><h1>Python lesson not found</h1><p><a routerLink="/python">Return to the Python tutorial</a>.</p></article>
    }
  `
})
export class PythonDocumentComponent implements AfterViewInit, OnInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly route = inject(ActivatedRoute);
  topic: PythonTopic | undefined;
  previousTopic: PythonTopic | undefined;
  nextTopic: PythonTopic | undefined;

  constructor() {
    this.setTopic(this.route.snapshot.paramMap.get('slug') ?? this.route.snapshot.url.at(-1)?.path);
  }

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      this.setTopic(segments.at(-1)?.path);
      setTimeout(() => this.applySectionCards());
    });
  }

  private setTopic(slug?: string): void {
    this.topic = PYTHON_LESSONS.find((item) => item.slug === slug);
    const index = this.topic ? PYTHON_LESSONS.indexOf(this.topic) : -1;
    this.previousTopic = index > 0 ? PYTHON_LESSONS[index - 1] : undefined;
    this.nextTopic = index >= 0 && index < PYTHON_LESSONS.length - 1 ? PYTHON_LESSONS[index + 1] : undefined;
  }

  ngAfterViewInit(): void {
    this.applySectionCards();
  }

  private applySectionCards(): void {
    const body = (this.host.nativeElement as HTMLElement).querySelector('.python-document-body') as HTMLElement | null;
    if (!body) return;

    if (this.topic) {
      appendFurtherReading(
        body.ownerDocument,
        `python-${this.topic.slug}`,
        PYTHON_LESSONS
          .filter((lesson) => lesson.category === this.topic?.category)
          .map((lesson) => ({ label: lesson.title, href: `/${lesson.slug}` })),
        { label: 'Python Tutorial Overview', href: '/python-tutorial' },
        `/${this.topic.slug}`
      );
    }

    const existingCards = Array.from(body.children).filter((child) => child.classList.contains('python-section-card')) as HTMLElement[];
    for (const existingCard of existingCards) {
      while (existingCard.firstChild) {
        body.insertBefore(existingCard.firstChild, existingCard);
      }
      body.removeChild(existingCard);
    }

    const children = Array.from(body.children) as HTMLElement[];
    const ownerDocument = body.ownerDocument;
    const fragment = ownerDocument.createDocumentFragment();
    let card: HTMLElement | undefined;

    for (const child of children) {
      if (child.tagName.toLowerCase() === 'h2') {
        card = ownerDocument.createElement('section');
        card.className = 'python-section-card';
        fragment.appendChild(card);
      }

      if (card) {
        card.appendChild(child);
      } else {
        fragment.appendChild(child);
      }
    }

    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
    body.appendChild(fragment);
  }
}
