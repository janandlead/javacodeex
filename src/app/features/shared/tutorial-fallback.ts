function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function createTutorialFallback(
  title: string,
  description: string,
  category: string,
  primaryKeyword = title
): string {
  const safeTitle = escapeHtml(title || `${category} tutorial`);
  const safeDescription = escapeHtml(description || `Learn ${title} with practical examples and clear explanations.`);
  const safeCategory = escapeHtml(category);
  const safeKeyword = escapeHtml(primaryKeyword || title);

  return `<header class="document-title">
    <h1>${safeTitle}</h1>
    <p class="lead">${safeDescription}</p>
  </header>
  <section>
    <h2>What Is ${safeKeyword}?</h2>
    <p>${safeKeyword} is an important ${safeCategory} concept. This tutorial explains the idea in simple language and connects it to the way developers build reliable applications. You will learn the purpose of the concept, the problem it solves, and the decisions that matter when you use it in a real project.</p>
    <p>A good understanding starts with the basic vocabulary. Read each example carefully, then change the values and observe the result. Small experiments make technical ideas easier to remember than memorising definitions alone.</p>
  </section>
  <section>
    <h2>How ${safeKeyword} Works</h2>
    <p>Most applications use this concept as part of a larger flow. First, the application receives input or configuration. Next, the relevant ${safeCategory} component validates that input and performs its main operation. Finally, it returns a result that another component can use. Keeping these responsibilities clear makes code easier to test and maintain.</p>
    <h3>Important Concepts</h3>
    <ul>
      <li>Understand the role of each class, method, or configuration property.</li>
      <li>Keep the example small before adding framework or production concerns.</li>
      <li>Handle invalid input and failure cases explicitly.</li>
      <li>Measure behaviour before making performance changes.</li>
    </ul>
  </section>
  <section>
    <h2>Practical ${safeKeyword} Example</h2>
    <p>The following small example shows the shape of a typical implementation. Adapt the names and values to your application rather than copying it blindly.</p>
    <pre><code>public class TutorialExample {
    public static void main(String[] args) {
        String topic = "${safeKeyword}";
        System.out.println("Learning: " + topic);
    }
}</code></pre>
    <p>In a production application, place business rules in focused services, validate external data, and add tests for both successful and failing cases. This keeps the tutorial idea useful as the codebase grows.</p>
  </section>
  <section>
    <h2>Common Mistakes and Key Points</h2>
    <p>Common mistakes include using a feature without understanding its lifecycle, hiding errors, duplicating configuration, and placing too much work in one class. Start with the simplest correct implementation. Then review logging, security, testing, and performance requirements for your own use case.</p>
    <p>Remember that ${safeKeyword} is one part of a complete ${safeCategory} solution. Combine it with clear naming, small methods, useful documentation, and automated tests. The related tutorials on Java Codeex can help you continue from this topic to the next practical skill.</p>
  </section>`;
}

export function normalizeTutorialHeadings(document: Document): void {
  document.querySelectorAll('h4').forEach((heading) => {
    const replacement = document.createElement('h3');
    replacement.innerHTML = heading.innerHTML;
    Array.from(heading.attributes).forEach((attribute) => replacement.setAttribute(attribute.name, attribute.value));
    heading.replaceWith(replacement);
  });

  document.querySelectorAll('h5, h6').forEach((heading) => {
    const replacement = document.createElement('p');
    replacement.innerHTML = heading.innerHTML;
    replacement.className = `${heading.className} tutorial-label`.trim();
    Array.from(heading.attributes).forEach((attribute) => {
      if (attribute.name !== 'class') replacement.setAttribute(attribute.name, attribute.value);
    });
    heading.replaceWith(replacement);
  });
}
