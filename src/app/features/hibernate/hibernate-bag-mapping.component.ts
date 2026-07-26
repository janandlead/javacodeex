import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-bag-mapping',
  standalone: true,
  template: `
    <article class="bag-mapping-page container-xl">
      <p class="eyebrow">Hibernate Collection Mapping</p>
      <h1>Mapping Bag in Collection Mapping</h1>
      <p class="lead">Map a Hibernate bag collection with an XML mapping file when the collection does not need a stored index or duplicate elimination.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">What Is a Bag Collection?</h2>
        <p>A Hibernate bag is an unordered, non-indexed collection. It is similar to a list in that duplicate values are allowed, but Hibernate does not persist a position for each element. Therefore, a <code>&lt;bag&gt;</code> mapping does not use an <code>&lt;index&gt;</code> element.</p>
        <pre>&lt;bag name="answers" table="question_answer"&gt;
  &lt;key column="question_id" not-null="true"/&gt;
  &lt;element column="answer" type="string"/&gt;
&lt;/bag&gt;</pre>
        <div class="note-box"><strong>Choose carefully:</strong> use a bag when ordering is not meaningful and duplicates are acceptable. Use a list when position matters, or a set when duplicate values must be removed.</div>
      </section>

      <section aria-labelledby="comparison">
        <h2 id="comparison">Bag Compared with List and Set</h2>
        <table class="table table-bordered"><thead><tr><th>Collection</th><th>Index column</th><th>Duplicates</th><th>Ordering</th></tr></thead><tbody>
          <tr><td><code>bag</code></td><td>No</td><td>Allowed</td><td>Not guaranteed</td></tr>
          <tr><td><code>list</code></td><td>Required</td><td>Allowed</td><td>Stored by position</td></tr>
          <tr><td><code>set</code></td><td>No</td><td>Removed according to equality</td><td>Not guaranteed unless ordered</td></tr>
        </tbody></table>
      </section>

      <section aria-labelledby="model">
        <h2 id="model">1. Create the Persistent Class</h2>
        <p>This forum example stores multiple text answers for each question. The Java property can be declared as a <code>List</code> for legacy XML compatibility, but the collection must be treated as unordered.</p>
        <pre>package com.example;

import java.util.ArrayList;
import java.util.List;

public class Question &#123;
    private Long id;
    private String questionText;
    private List&lt;String&gt; answers = new ArrayList&lt;&gt;();

    protected Question() &#123;
        // Required by Hibernate.
    &#125;

    public Question(String text, List&lt;String&gt; answers) &#123;
        this.questionText = text;
        this.answers = answers;
    &#125;

    public Long getId() &#123; return id; &#125;
    public void setId(Long id) &#123; this.id = id; &#125;
    public String getQuestionText() &#123; return questionText; &#125;
    public void setQuestionText(String text) &#123; this.questionText = text; &#125;
    public List&lt;String&gt; getAnswers() &#123; return answers; &#125;
    public void setAnswers(List&lt;String&gt; answers) &#123; this.answers = answers; &#125;
&#125;</pre>
        <p>For new code, consider exposing a <code>Collection&lt;String&gt;</code> or using an explicit <code>&#64;ElementCollection</code> mapping. The XML <code>&lt;bag&gt;</code> element controls the persistence semantics.</p>
      </section>

      <section aria-labelledby="mapping">
        <h2 id="mapping">2. Create the Bag Mapping File</h2>
        <p>Create <code>question.hbm.xml</code> in the resources directory. The <code>key</code> links each answer row to its question and <code>element</code> stores the basic string value.</p>
        <pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-mapping PUBLIC
  "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
  "https://hibernate.org/dtd/hibernate-mapping-3.0.dtd"&gt;
&lt;hibernate-mapping&gt;
  &lt;class name="com.example.Question" table="question"&gt;
    &lt;id name="id" column="id"&gt;
      &lt;generator class="identity"/&gt;
    &lt;/id&gt;

    &lt;property name="questionText" column="question_text"/&gt;

    &lt;bag name="answers" table="question_answer"&gt;
      &lt;key column="question_id" not-null="true"/&gt;
      &lt;element column="answer" type="string" not-null="true"/&gt;
    &lt;/bag&gt;
  &lt;/class&gt;
&lt;/hibernate-mapping&gt;</pre>
        <p>No index column is created because the mapping does not promise a stable order. The collection table can contain duplicate answer values for the same question.</p>
      </section>

      <section aria-labelledby="configuration">
        <h2 id="configuration">3. Create the Configuration File</h2>
        <p>Place <code>hibernate.cfg.xml</code> in <code>src/main/resources</code>. H2 is used here for a portable example.</p>
        <pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-configuration PUBLIC
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
  "https://hibernate.org/dtd/hibernate-configuration-3.0.dtd"&gt;
&lt;hibernate-configuration&gt;
  &lt;session-factory&gt;
    &lt;property name="hibernate.connection.driver_class"&gt;org.h2.Driver&lt;/property&gt;
    &lt;property name="hibernate.connection.url"&gt;jdbc:h2:mem:forum-bag;DB_CLOSE_DELAY=-1&lt;/property&gt;
    &lt;property name="hibernate.connection.username"&gt;sa&lt;/property&gt;
    &lt;property name="hibernate.connection.password"&gt;&lt;/property&gt;
    &lt;property name="hibernate.dialect"&gt;org.hibernate.dialect.H2Dialect&lt;/property&gt;
    &lt;property name="hibernate.hbm2ddl.auto"&gt;create-drop&lt;/property&gt;
    &lt;property name="hibernate.show_sql"&gt;true&lt;/property&gt;
    &lt;mapping resource="question.hbm.xml"/&gt;
  &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;</pre>
        <p>Use migrations instead of <code>create-drop</code> for a production database.</p>
      </section>

      <section aria-labelledby="store">
        <h2 id="store">4. Store Questions and Answers</h2>
        <p>Persist two questions with their answer collections in one transaction.</p>
        <pre>package com.example;

import java.util.List;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class StoreData &#123;
    public static void main(String[] args) &#123;
        try (SessionFactory factory = new Configuration()
                .configure()
                .buildSessionFactory();
             Session session = factory.openSession()) &#123;

            Transaction transaction = session.beginTransaction();
            try &#123;
                Question java = new Question(
                    "What is Java?",
                    List.of("Java is a programming language",
                            "Java is a platform"));
                Question servlet = new Question(
                    "What is a Servlet?",
                    List.of("A Servlet is an interface",
                            "A Servlet is an API"));

                session.persist(java);
                session.persist(servlet);
                transaction.commit();
                System.out.println("Questions saved successfully");
            &#125; catch (RuntimeException exception) &#123;
                transaction.rollback();
                throw exception;
            &#125;
        &#125;
    &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="fetch">
        <h2 id="fetch">5. Fetch the Bag with HQL</h2>
        <p>Access the collection while the Hibernate session is open. Since a bag has no persisted index, do not rely on the order in which answers are returned.</p>
        <pre>try (Session session = factory.openSession()) &#123;
    List&lt;Question&gt; questions = session
        .createQuery("from Question", Question.class)
        .getResultList();

    for (Question question : questions) &#123;
        System.out.println(
            "Question: " + question.getQuestionText());

        for (String answer : question.getAnswers()) &#123;
            System.out.println("- " + answer);
        &#125;
    &#125;
&#125;</pre>
        <p>For a large number of questions, plan fetching deliberately to avoid N+1 queries. Use a query with an explicit fetch join or an entity graph when the use case requires the answers immediately.</p>
      </section>

      <section aria-labelledby="entity">
        <h2 id="entity">Bag of Entity References</h2>
        <p>A bag can also hold entity references. Replace <code>&lt;element&gt;</code> with a relationship element in legacy XML:</p>
        <pre>&lt;bag name="answers" table="question_answer"&gt;
  &lt;key column="question_id" not-null="true"/&gt;
  &lt;one-to-many class="com.example.Answer"/&gt;
&lt;/bag&gt;</pre>
        <p>For modern mappings, use <code>&#64;OneToMany</code>. Define cascade, orphan removal, ownership, and equality behavior carefully before allowing duplicate entity references.</p>
      </section>

      <section aria-labelledby="best-practices">
        <h2 id="best-practices">Bag Mapping Best Practices</h2>
        <ul><li>Use a bag only when order is not part of the business meaning.</li><li>Use a list with an order column when the position must be preserved.</li><li>Use a set when duplicate values are not valid.</li><li>Keep the collection initialized and avoid <code>null</code>.</li><li>Do not access a lazy bag after its session has closed.</li><li>Use <code>not-null="true"</code> when every collection row must have an owner.</li><li>Use database indexes on foreign-key columns for large collections.</li><li>Use schema migrations rather than automatic schema updates in production.</li></ul>
        <div class="success-box"><strong>Result:</strong> the question is stored in the parent table and each answer is stored in the collection table without an index column. Duplicate answers are allowed, and their retrieval order is not guaranteed.</div>
      </section>
    </article>
  `,
  styles: [`
    .bag-mapping-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.bag-mapping-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.bag-mapping-page section{max-width:70rem;margin-top:3rem}.bag-mapping-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.bag-mapping-page p,.bag-mapping-page li{line-height:1.8}.bag-mapping-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.bag-mapping-page code{color:#be123c}.bag-mapping-page pre code{color:inherit}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}
  `]
})
export class HibernateBagMappingComponent {}
