import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-python', standalone: true, imports: [RouterLink],
  template: `<article class="container-xl course-document py-5">
    <p class="eyebrow">Python Programming Language</p>
    <h1>Python Tutorial</h1>
    <p class="lead">Learn Python programming from the basics with clear explanations, practical examples, and a structured path for beginners and working professionals.</p>

    <section class="section-card p-4" aria-labelledby="python-introduction">
      <h2 id="python-introduction">Python Tutorial Introduction</h2>
      <p>Python is a popular general-purpose programming language known for its readable syntax and broad ecosystem. Its simple structure helps beginners learn programming, while its libraries and frameworks support professional software development.</p>
      <p>This tutorial covers Python installation, syntax, variables, data types, operators, conditions, loops, built-in data structures, functions, modules, object-oriented programming, exception handling, file handling, JSON, and more.</p>
    </section>

    <section class="section-card p-4" aria-labelledby="what-is-python">
      <h2 id="what-is-python">What Is Python?</h2>
      <p>Python is a high-level, dynamically typed language that supports procedural, object-oriented, and functional programming styles. Python programs are commonly executed by an interpreter, and Python implementations compile source code to an internal form before execution.</p>
      <p>Python also provides automatic memory management and a large standard library for common programming tasks.</p>
    </section>

    <section class="section-card p-4" aria-labelledby="hello-world">
      <h2 id="hello-world">Python Hello World Program</h2>
      <p>The <code>print()</code> function displays text in the console. This is a complete Python program:</p>
      <pre><code>print("Hello, World!")</code></pre>
      <p>Save the code in a file such as <code>hello.py</code> and run it with <code>python hello.py</code>.</p>
      <h6 class="mt-3 mb-1 text-muted">Output</h6>
      <div class="output-box">Hello, World!</div>
    </section>

    <section class="section-card p-4" aria-labelledby="why-learn-python">
      <h2 id="why-learn-python">Why Learn Python?</h2>
      <ul>
        <li><strong>Beginner-friendly syntax:</strong> Python code is concise and close to natural language.</li>
        <li><strong>Object-oriented programming:</strong> Classes and objects help developers build reusable and maintainable software.</li>
        <li><strong>Automatic memory management:</strong> Python manages object memory automatically through its runtime.</li>
        <li><strong>Cross-platform support:</strong> Python programs can run on major operating systems with little or no change.</li>
        <li><strong>Large ecosystem:</strong> The standard library and third-party packages provide solutions for web development, data analysis, automation, testing, and more.</li>
      </ul>
    </section>

    <section class="section-card p-4" aria-labelledby="python-gui">
      <h2 id="python-gui">GUI Programming with Python</h2>
      <p>Python can be used to create desktop applications with GUI toolkits such as Tkinter, PyQt, and wxPython. These toolkits provide widgets, layouts, event handling, and other features required for interactive applications.</p>
    </section>

    <section class="section-card p-4" aria-labelledby="python-uses">
      <h2 id="python-uses">Where Is Python Used?</h2>
      <p>Python is used in many technical fields because it is readable, flexible, and supported by a large developer community.</p>
      <ul>
        <li><strong>Data science and analysis:</strong> NumPy, pandas, and Matplotlib support data processing and visualization.</li>
        <li><strong>Artificial intelligence and machine learning:</strong> TensorFlow, PyTorch, and scikit-learn support model development and experimentation.</li>
        <li><strong>Web development:</strong> Django, Flask, and FastAPI help developers build web applications and APIs.</li>
        <li><strong>Automation and scripting:</strong> Python automates repetitive tasks, file operations, reports, and workflows.</li>
        <li><strong>Web scraping and integration:</strong> Requests and Beautiful Soup are commonly used for HTTP requests and HTML parsing.</li>
        <li><strong>Testing and quality assurance:</strong> pytest helps developers write and run automated tests.</li>
      </ul>
    </section>

    <section class="section-card p-4" aria-labelledby="python-libraries">
      <h2 id="python-libraries">Popular Python Libraries and Frameworks</h2>
      <p>Python’s ecosystem contains tools for different development needs:</p>
      <ul>
        <li><strong>Web and APIs:</strong> Django, Flask, FastAPI, and Django REST Framework</li>
        <li><strong>Data and mathematics:</strong> NumPy, pandas, SciPy, and Matplotlib</li>
        <li><strong>Machine learning:</strong> scikit-learn, TensorFlow, and PyTorch</li>
        <li><strong>Desktop and games:</strong> Tkinter, PyQt, Kivy, and Pygame</li>
        <li><strong>HTTP and web parsing:</strong> Requests and Beautiful Soup</li>
        <li><strong>Databases and testing:</strong> SQLAlchemy and pytest</li>
        <li><strong>Interactive applications:</strong> Streamlit for data-focused web applications</li>
      </ul>
    </section>

    <section class="section-card p-4" aria-labelledby="python-learning-path">
      <h2 id="python-learning-path">Python Learning Path</h2>
      <p>Start with the Python basics, then progress through data structures, functions, modules, object-oriented programming, exceptions, and file handling. Select a lesson from the Python menu to continue learning step by step.</p>
    </section>

    <section class="further-reading" aria-labelledby="python-further-reading">
      <h2 id="python-further-reading">Further Reading</h2>
      <p>Continue learning with these Python lessons:</p>
      <ul>
        <li><a routerLink="/what-is-python"><span class="further-reading-index">01</span><span class="further-reading-label">What is Python</span><span class="further-reading-arrow" aria-hidden="true">→</span></a></li>
        <li><a routerLink="/python-features"><span class="further-reading-index">02</span><span class="further-reading-label">Python Features</span><span class="further-reading-arrow" aria-hidden="true">→</span></a></li>
        <li><a routerLink="/python-variables"><span class="further-reading-index">03</span><span class="further-reading-label">Python Variables</span><span class="further-reading-arrow" aria-hidden="true">→</span></a></li>
        <li><a routerLink="/python-data-types"><span class="further-reading-index">04</span><span class="further-reading-label">Python Data Types</span><span class="further-reading-arrow" aria-hidden="true">→</span></a></li>
        <li><a routerLink="/python-functions"><span class="further-reading-index">05</span><span class="further-reading-label">Python Functions</span><span class="further-reading-arrow" aria-hidden="true">→</span></a></li>
        <li><a routerLink="/python-oops"><span class="further-reading-index">06</span><span class="further-reading-label">Python OOPs</span><span class="further-reading-arrow" aria-hidden="true">→</span></a></li>
      </ul>
    </section>

    <p class="pager-heading">Continue learning</p>
    <nav class="course-pager" aria-label="Python tutorial navigation">
      <a class="pager-link previous" routerLink="/" aria-label="Previous: Home">
        <span class="pager-direction"><i class="bi bi-arrow-left"></i> Previous</span>
        <strong>Home</strong>
      </a>
      <a class="pager-link next" routerLink="/what-is-python">
        <span class="pager-direction">Next <i class="bi bi-arrow-right"></i></span>
        <strong>What is Python</strong>
      </a>
    </nav>
  </article>`
})
export class PythonComponent {}
