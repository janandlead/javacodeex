import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-list-mapping',
  standalone: true,
  template: `
    <article class="list-mapping-page container-xl">
      <p class="eyebrow">Hibernate Collection Mapping</p>
      <h1>Mapping List in Collection Mapping</h1>
      <p class="lead">Map a Java <code>List&lt;String&gt;</code> with a Hibernate XML mapping file using a question-and-answers example.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">Mapping a List with XML</h2>
        <p>If a persistent class contains a <code>List</code>, the collection can be mapped with Hibernate's legacy <code>&lt;list&gt;</code> element. A list is an indexed collection, so Hibernate stores the position in a separate index column.</p>
        <pre>&lt;list name="answers" table="question_answer"&gt;
  &lt;key column="question_id" not-null="true"/&gt;
  &lt;index column="answer_position"/&gt;
  &lt;element column="answer" type="string"/&gt;
&lt;/list&gt;</pre>
        <div class="note-box"><strong>Modern alternative:</strong> new applications generally use JPA annotations such as <code>&#64;ElementCollection</code> and <code>&#64;OrderColumn</code>. XML mapping remains useful when maintaining an existing Hibernate application or when mapping metadata must stay outside Java classes.</div>
      </section>

      <section aria-labelledby="model">
        <h2 id="model">1. Create the Persistent Class</h2>
        <p>This example models a forum in which one question has multiple text answers.</p>
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

    public Question(String questionText, List&lt;String&gt; answers) &#123;
        this.questionText = questionText;
        this.answers = answers;
    &#125;

    public Long getId() &#123; return id; &#125;
    public void setId(Long id) &#123; this.id = id; &#125;
    public String getQuestionText() &#123; return questionText; &#125;
    public void setQuestionText(String text) &#123; this.questionText = text; &#125;
    public List&lt;String&gt; getAnswers() &#123; return answers; &#125;
    public void setAnswers(List&lt;String&gt; answers) &#123; this.answers = answers; &#125;
&#125;</pre>
        <p>Because the list contains strings rather than entity objects, the XML mapping uses <code>&lt;element&gt;</code>. If it contained <code>Answer</code> entities, use a relationship mapping such as <code>&lt;one-to-many&gt;</code> instead.</p>
      </section>

      <section aria-labelledby="mapping">
        <h2 id="mapping">2. Create the XML Mapping File</h2>
        <p>Create <code>question.hbm.xml</code> in the application's resources directory. The <code>key</code> column links collection rows to the question, <code>index</code> stores list order, and <code>element</code> stores each string.</p>
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

    &lt;list name="answers" table="question_answer"&gt;
      &lt;key column="question_id" not-null="true"/&gt;
      &lt;index column="answer_position" base="0"/&gt;
      &lt;element column="answer" type="string" not-null="true"/&gt;
    &lt;/list&gt;
  &lt;/class&gt;
&lt;/hibernate-mapping&gt;</pre>
        <p>The collection table contains one row per answer. Its foreign key points to <code>question.id</code>, while <code>answer_position</code> preserves the list order.</p>
      </section>

      <section aria-labelledby="configuration">
        <h2 id="configuration">3. Create the Configuration File</h2>
        <p>Place <code>hibernate.cfg.xml</code> in <code>src/main/resources</code>. This example uses H2 so it can run without an external database; replace the URL and dialect for MySQL, PostgreSQL, Oracle, or another supported database.</p>
        <pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-configuration PUBLIC
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
  "https://hibernate.org/dtd/hibernate-configuration-3.0.dtd"&gt;
&lt;hibernate-configuration&gt;
  &lt;session-factory&gt;
    &lt;property name="hibernate.connection.driver_class"&gt;org.h2.Driver&lt;/property&gt;
    &lt;property name="hibernate.connection.url"&gt;jdbc:h2:mem:forum;DB_CLOSE_DELAY=-1&lt;/property&gt;
    &lt;property name="hibernate.connection.username"&gt;sa&lt;/property&gt;
    &lt;property name="hibernate.connection.password"&gt;&lt;/property&gt;
    &lt;property name="hibernate.dialect"&gt;org.hibernate.dialect.H2Dialect&lt;/property&gt;
    &lt;property name="hibernate.hbm2ddl.auto"&gt;create-drop&lt;/property&gt;
    &lt;property name="hibernate.show_sql"&gt;true&lt;/property&gt;
    &lt;mapping resource="question.hbm.xml"/&gt;
  &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;</pre>
        <p>Use <code>create-drop</code> only for a self-contained example. Production applications should manage tables and indexes with a migration tool.</p>
      </section>

      <section aria-labelledby="store">
        <h2 id="store">4. Store Questions and Answers</h2>
        <p>Create two questions, assign each a list of strings, and persist them inside one transaction.</p>
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

      <section aria-labelledby="tables">
        <h2 id="tables">Tables Created by the Mapping</h2>
        <table class="table table-bordered"><thead><tr><th>Table</th><th>Important columns</th><th>Purpose</th></tr></thead><tbody>
          <tr><td><code>question</code></td><td><code>id</code>, <code>question_text</code></td><td>Stores the persistent question.</td></tr>
          <tr><td><code>question_answer</code></td><td><code>question_id</code>, <code>answer_position</code>, <code>answer</code></td><td>Stores one row for each list element and its position.</td></tr>
        </tbody></table>
        <p>The relationship is one-to-many from <code>question</code> to collection rows. The collection table is not an entity table because its values are basic strings.</p>
      </section>

      <section aria-labelledby="fetch">
        <h2 id="fetch">5. Fetch the List with HQL</h2>
        <p>Query the questions and iterate over each list. The collection is read while the session is open.</p>
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
        <p>Hibernate loads the question rows and the associated collection rows according to the configured fetch strategy. For many questions, consider a deliberate fetch plan to avoid an N+1 query problem.</p>
      </section>

      <section aria-labelledby="rules">
        <h2 id="rules">Important Mapping Rules</h2>
        <ul><li><code>&lt;list&gt;</code> requires an index column because list order is persisted.</li><li><code>&lt;element&gt;</code> is for basic values such as strings and numbers.</li><li>Use <code>&lt;one-to-many&gt;</code> or <code>&lt;many-to-many&gt;</code> for entity references.</li><li>Use <code>not-null="true"</code> on the key when every collection row must have an owner.</li><li>Initialize collection properties and avoid returning <code>null</code>.</li><li>Do not access a lazy collection after its session has closed.</li><li>Do not use the legacy <code>increment</code> identifier strategy for concurrent production applications.</li></ul>
        <div class="success-box"><strong>Result:</strong> each question is stored in the parent table, each answer is stored in the collection table, and the index column preserves the order of answers.</div>
      </section>
    </article>
  `,
  styles: [`
    .list-mapping-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.list-mapping-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.list-mapping-page section{max-width:70rem;margin-top:3rem}.list-mapping-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.list-mapping-page p,.list-mapping-page li{line-height:1.8}.list-mapping-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.list-mapping-page code{color:#be123c}.list-mapping-page pre code{color:inherit}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}
  `]
})
export class HibernateListMappingComponent {}
