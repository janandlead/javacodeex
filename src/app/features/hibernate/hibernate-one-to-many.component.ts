import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-one-to-many',
  standalone: true,
  template: `
    <article class="one-to-many-page container-xl">
      <p class="eyebrow">Hibernate Relationships</p>
      <h1>Hibernate One-to-Many Example Using Annotations</h1>
      <p class="lead">Map one Question to many Answer entities using a modern Jakarta Persistence and Hibernate annotation mapping.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">One-to-Many Association</h2>
        <p>In a forum, one question can have many answers, while each answer belongs to one question. The parent entity contains a collection of answers and the child entity owns the foreign key.</p>
        <div class="relationship-flow"><span>Question</span><b>1</b><span>────────</span><b>*</b><span>Answer</span></div>
        <p>This example uses a bidirectional relationship. <code>Answer.question</code> is the owning side because it contains the <code>question_id</code> foreign key. <code>Question.answers</code> uses <code>mappedBy</code> to refer to that field.</p>
      </section>

      <section aria-labelledby="dependencies">
        <h2 id="dependencies">1. Add Maven Dependencies</h2>
        <p>Hibernate 6 uses the Jakarta Persistence namespace. H2 is used for a self-contained example; replace it with the JDBC driver for your database when needed.</p>
        <pre>&lt;dependency&gt;
  &lt;groupId&gt;org.hibernate.orm&lt;/groupId&gt;
  &lt;artifactId&gt;hibernate-core&lt;/artifactId&gt;
  &lt;version&gt;6.6.9.Final&lt;/version&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
  &lt;groupId&gt;com.h2database&lt;/groupId&gt;
  &lt;artifactId&gt;h2&lt;/artifactId&gt;
  &lt;version&gt;2.3.232&lt;/version&gt;
  &lt;scope&gt;runtime&lt;/scope&gt;
&lt;/dependency&gt;</pre>
        <p>Older Hibernate 5 applications may use <code>javax.persistence</code>, but the entity imports, Hibernate version, and dependency namespace must remain consistent.</p>
      </section>

      <section aria-labelledby="question">
        <h2 id="question">2. Create the Question Entity</h2>
        <p>The parent entity owns the collection in the object model, while <code>mappedBy</code> tells Hibernate that the child controls the database relationship.</p>
        <pre>package com.example;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

&#64;Entity
public class Question &#123;
    &#64;Id
    &#64;GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;

    &#64;OneToMany(
        mappedBy = "question",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List&lt;Answer&gt; answers = new ArrayList&lt;&gt;();

    protected Question() &#123; &#125;

    public Question(String questionText) &#123;
        this.questionText = questionText;
    &#125;

    public void addAnswer(Answer answer) &#123;
        answers.add(answer);
        answer.setQuestion(this);
    &#125;

    public void removeAnswer(Answer answer) &#123;
        answers.remove(answer);
        answer.setQuestion(null);
    &#125;

    public Long getId() &#123; return id; &#125;
    public String getQuestionText() &#123; return questionText; &#125;
    public List&lt;Answer&gt; getAnswers() &#123; return answers; &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="answer">
        <h2 id="answer">3. Create the Answer Entity</h2>
        <p>The child entity contains the foreign-key mapping. <code>FetchType.LAZY</code> avoids loading every answer when only a question is needed.</p>
        <pre>package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

&#64;Entity
public class Answer &#123;
    &#64;Id
    &#64;GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String answerText;
    private String postedBy;

    &#64;ManyToOne(fetch = FetchType.LAZY, optional = false)
    &#64;JoinColumn(name = "question_id", nullable = false)
    private Question question;

    protected Answer() &#123; &#125;

    public Answer(String answerText, String postedBy) &#123;
        this.answerText = answerText;
        this.postedBy = postedBy;
    &#125;

    public void setQuestion(Question question) &#123;
        this.question = question;
    &#125;

    public String getAnswerText() &#123; return answerText; &#125;
    public String getPostedBy() &#123; return postedBy; &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="configuration">
        <h2 id="configuration">4. Configure Hibernate</h2>
        <p>Place this file in <code>src/main/resources/hibernate.cfg.xml</code>. Both entities are registered explicitly.</p>
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
    &lt;mapping class="com.example.Question"/&gt;
    &lt;mapping class="com.example.Answer"/&gt;
  &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;</pre>
        <p>Use Flyway, Liquibase, or another migration tool instead of <code>create-drop</code> for production schema management.</p>
      </section>

      <section aria-labelledby="store">
        <h2 id="store">5. Persist Questions and Answers</h2>
        <p>Use the helper method to update both sides of the relationship. Because <code>cascade = CascadeType.ALL</code> is configured, persisting a question also persists its answers.</p>
        <pre>package com.example;

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
                Question java = new Question("What is Java?");
                java.addAnswer(new Answer(
                    "Java is a programming language", "Ravi Malik"));
                java.addAnswer(new Answer(
                    "Java is a platform", "Sudhir Kumar"));

                Question servlet = new Question("What is a Servlet?");
                servlet.addAnswer(new Answer(
                    "A Servlet is an interface", "Jai Kumar"));
                servlet.addAnswer(new Answer(
                    "A Servlet is an API", "Arun"));

                session.persist(java);
                session.persist(servlet);
                transaction.commit();
                System.out.println("Questions and answers saved");
            &#125; catch (RuntimeException exception) &#123;
                transaction.rollback();
                throw exception;
            &#125;
        &#125;
    &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="fetch">
        <h2 id="fetch">6. Fetch the Relationship with HQL</h2>
        <p>Use a fetch join when the page needs questions and answers together. The <code>distinct</code> keyword avoids duplicate parent objects caused by the SQL join.</p>
        <pre>List&lt;Question&gt; questions = session
    .createQuery(
        "select distinct q "
        + "from Question q "
        + "left join fetch q.answers",
        Question.class)
    .getResultList();

for (Question question : questions) &#123;
    System.out.println(question.getQuestionText());
    for (Answer answer : question.getAnswers()) &#123;
        System.out.println(
            answer.getAnswerText() + " - "
            + answer.getPostedBy());
    &#125;
&#125;</pre>
        <p>Alternatively, access the lazy collection inside an active transaction. Avoid exposing lazy entities directly from a closed-session web request.</p>
      </section>

      <section aria-labelledby="ownership">
        <h2 id="ownership">Owning Side and Common Options</h2>
        <table class="table table-bordered"><thead><tr><th>Option</th><th>Purpose</th></tr></thead><tbody>
          <tr><td><code>mappedBy = "question"</code></td><td>Marks the parent collection as the inverse side of the relationship.</td></tr>
          <tr><td><code>&#64;JoinColumn</code></td><td>Defines the foreign-key column on the child table.</td></tr>
          <tr><td><code>cascade = CascadeType.ALL</code></td><td>Propagates persistence and removal operations from question to answers.</td></tr>
          <tr><td><code>orphanRemoval = true</code></td><td>Deletes a child removed from the parent collection.</td></tr>
          <tr><td><code>&#64;OrderColumn</code></td><td>Stores list position when answer order is meaningful.</td></tr>
        </tbody></table>
        <div class="note-box"><strong>Lifecycle warning:</strong> use <code>orphanRemoval</code> only when an answer cannot exist independently of its question. Do not use broad cascading on relationships whose child lifecycle is shared elsewhere.</div>
      </section>

      <section aria-labelledby="best-practices">
        <h2 id="best-practices">Best Practices</h2>
        <ul><li>Use <code>jakarta.persistence</code> with Hibernate 6.</li><li>Initialize collections and maintain both sides with helper methods.</li><li>Use <code>LAZY</code> for large collections and fetch deliberately.</li><li>Use <code>Set</code> when duplicates are invalid and <code>List</code> with <code>&#64;OrderColumn</code> when position matters.</li><li>Exclude relationships from <code>equals()</code> and <code>hashCode()</code> to avoid recursion and lazy loading.</li><li>Use database indexes on foreign-key columns.</li><li>Use schema migrations in production.</li></ul>
        <div class="success-box"><strong>Result:</strong> one question is stored in the question table, many answers are stored in the answer table, and each answer references its question through <code>question_id</code>.</div>
      </section>
    </article>
  `,
  styles: [`
    .one-to-many-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.one-to-many-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.one-to-many-page section{max-width:70rem;margin-top:3rem}.one-to-many-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.one-to-many-page p,.one-to-many-page li{line-height:1.8}.one-to-many-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.one-to-many-page code{color:#be123c}.one-to-many-page pre code{color:inherit}.relationship-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.8rem;padding:1.25rem;border:1px solid #bae6fd;border-radius:1rem;background:#f0f9ff;color:#0f3460;font-weight:800}.relationship-flow b{color:#0891b2;font-size:1.2rem}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}
  `]
})
export class HibernateOneToManyComponent {}
