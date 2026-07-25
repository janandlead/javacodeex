import { Component } from '@angular/core';

@Component({
  selector: 'app-python', standalone: true,
  template: `<article class="container-xl py-5"><p class="eyebrow">Programming course</p><h1>Python Programming Tutorials</h1><p class="lead">Learn Python fundamentals through clear explanations, practical examples, and beginner-friendly programming exercises.</p><section aria-labelledby="python-course-overview"><h2 id="python-course-overview">Python Course Overview</h2><p>This learning path is being prepared for a future release. It will cover Python syntax, variables, data types, conditions, loops, functions, collections, object-oriented programming, file handling, testing, and practical application development.</p><p>While the Python course is being prepared, you can build strong programming fundamentals with our Java tutorials and then apply similar concepts to Spring Boot backend development.</p></section><section aria-labelledby="python-topics"><h2 id="python-topics">Topics Planned</h2><ul><li>Python syntax, variables, and data types</li><li>Functions, modules, and reusable code</li><li>Lists, dictionaries, sets, and tuples</li><li>Object-oriented programming</li><li>File handling, testing, and application projects</li></ul></section><a class="btn btn-primary" routerLink="/">Explore all courses</a></article>`
})
export class PythonComponent {}
