import { Component } from '@angular/core';

@Component({
  selector: 'app-hibernate-many-to-many',
  standalone: true,
  template: `
    <article class="many-to-many-page container-xl">
      <p class="eyebrow">Hibernate Relationships</p>
      <h1>Hibernate Many-to-Many Example Using Annotations</h1>
      <p class="lead">Map a many-to-many relationship between questions and answers using Jakarta Persistence annotations and a join table.</p>

      <section aria-labelledby="overview">
        <h2 id="overview">Many-to-Many Association</h2>
        <p>A many-to-many relationship means that one question can reference many answers and one answer can be associated with many questions. Hibernate represents the relationship with three tables:</p>
        <div class="table-flow"><span>question</span><b>↘</b><span>question_answer</span><b>↙</b><span>answer</span></div>
        <p>The join table contains one row for every question-answer association. A direct many-to-many mapping is suitable when the association has no additional attributes. If the relationship needs fields such as vote count, creation time, or moderation status, model the join table as its own entity.</p>
      </section>

      <section aria-labelledby="dependencies">
        <h2 id="dependencies">1. Add Maven Dependencies</h2>
        <p>This example uses Hibernate 6, Jakarta Persistence, and an in-memory H2 database.</p>
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
        <p>Use the JDBC driver and compatible dialect for MySQL, PostgreSQL, Oracle, or another database. Hibernate 5 projects may use the older <code>javax.persistence</code> namespace, but should not mix it with Jakarta imports.</p>
      </section>

      <section aria-labelledby="question">
        <h2 id="question">2. Create the Question Entity</h2>
        <p>The question entity is the owning side because it declares <code>&#64;JoinTable</code>. A <code>Set</code> is often safer than a list for a direct many-to-many relationship because it prevents duplicate associations when equality is defined correctly.</p>
        <pre>package com.example;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;

&#64;Entity
public class Question &#123;
    &#64;Id
    &#64;GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;

    &#64;ManyToMany(cascade = &#123; CascadeType.PERSIST, CascadeType.MERGE &#125;)
    &#64;JoinTable(
        name = "question_answer",
        joinColumns = &#64;JoinColumn(name = "question_id"),
        inverseJoinColumns = &#64;JoinColumn(name = "answer_id")
    )
    private Set&lt;Answer&gt; answers = new HashSet&lt;&gt;();

    protected Question() &#123; &#125;

    public Question(String questionText) &#123;
        this.questionText = questionText;
    &#125;

    public void addAnswer(Answer answer) &#123;
        answers.add(answer);
        answer.getQuestions().add(this);
    &#125;

    public Set&lt;Answer&gt; getAnswers() &#123; return answers; &#125;
    public String getQuestionText() &#123; return questionText; &#125;
&#125;</pre>
        <p><code>CascadeType.ALL</code> is intentionally not used here because an answer may be shared by other questions. Cascade only the lifecycle operations that match the application's ownership rules.</p>
      </section>

      <section aria-labelledby="answer">
        <h2 id="answer">3. Create the Answer Entity</h2>
        <p>The inverse side uses <code>mappedBy</code> and does not declare another join table. This prevents Hibernate from trying to manage the same association twice.</p>
        <pre>package com.example;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;

&#64;Entity
public class Answer &#123;
    &#64;Id
    &#64;GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String answerText;
    private String postedBy;

    &#64;ManyToMany(mappedBy = "answers", fetch = FetchType.LAZY)
    private Set&lt;Question&gt; questions = new HashSet&lt;&gt;();

    protected Answer() &#123; &#125;

    public Answer(String answerText, String postedBy) &#123;
        this.answerText = answerText;
        this.postedBy = postedBy;
    &#125;

    public Set&lt;Question&gt; getQuestions() &#123; return questions; &#125;
    public String getAnswerText() &#123; return answerText; &#125;
    public String getPostedBy() &#123; return postedBy; &#125;
&#125;</pre>
      </section>

      <section aria-labelledby="configuration">
        <h2 id="configuration">4. Configure Hibernate</h2>
        <p>Place <code>hibernate.cfg.xml</code> in <code>src/main/resources</code> and register both entities.</p>
        <pre>&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-configuration PUBLIC
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
  "https://hibernate.org/dtd/hibernate-configuration-3.0.dtd"&gt;
&lt;hibernate-configuration&gt;
  &lt;session-factory&gt;
    &lt;property name="hibernate.connection.driver_class"&gt;org.h2.Driver&lt;/property&gt;
    &lt;property name="hibernate.connection.url"&gt;jdbc:h2:mem:forum-many;DB_CLOSE_DELAY=-1&lt;/property&gt;
    &lt;property name="hibernate.connection.username"&gt;sa&lt;/property&gt;
    &lt;property name="hibernate.connection.password"&gt;&lt;/property&gt;
    &lt;property name="hibernate.dialect"&gt;org.hibernate.dialect.H2Dialect&lt;/property&gt;
    &lt;property name="hibernate.hbm2ddl.auto"&gt;create-drop&lt;/property&gt;
    &lt;property name="hibernate.show_sql"&gt;true&lt;/property&gt;
    &lt;mapping class="com.example.Question"/&gt;
    &lt;mapping class="com.example.Answer"/&gt;
  &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;</pre>
        <p>Use database migrations instead of <code>create-drop</code> for production environments.</p>
      </section>

      <section aria-labelledby="store">
        <h2 id="store">5. Persist Questions and Answers</h2>
        <p>Two questions and four answers are created. The same answer can be associated with more than one question, which demonstrates the many-to-many relationship.</p>
        <pre>try (SessionFactory factory = new Configuration()
        .configure()
        .buildSessionFactory();
     Session session = factory.openSession()) &#123;

    Transaction transaction = session.beginTransaction();
    try &#123;
        Answer javaAnswer = new Answer(
            "Java is a programming language", "Ravi Malik");
        Answer platformAnswer = new Answer(
            "Java is a platform", "Sudhir Kumar");

        Question java = new Question("What is Java?");
        java.addAnswer(javaAnswer);
        java.addAnswer(platformAnswer);

        Question platform = new Question("Why is Java portable?");
        platform.addAnswer(platformAnswer);

        session.persist(java);
        session.persist(platform);
        transaction.commit();
    &#125; catch (RuntimeException exception) &#123;
        transaction.rollback();
        throw exception;
    &#125;
&#125;</pre>
        <p>Because the question side cascades persist and merge, the new answers are persisted when the questions are persisted. The shared <code>platformAnswer</code> receives two join-table rows.</p>
      </section>

      <section aria-labelledby="fetch">
        <h2 id="fetch">6. Fetch the Relationship with HQL</h2>
        <p>Use a fetch join when a screen needs the questions and their answers together.</p>
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
        <p>The collection should be accessed while the session is open. For pagination or large collections, use a separate query or an explicit fetch plan rather than joining everything into one result.</p>
      </section>

      <section aria-labelledby="list">
        <h2 id="list">Using a List Instead of a Set</h2>
        <p>A list can be used when the association has meaningful order, but the order must be mapped explicitly.</p>
        <pre>&#64;ManyToMany
&#64;JoinTable(name = "question_answer")
&#64;OrderColumn(name = "answer_position")
private List&lt;Answer&gt; answers = new ArrayList&lt;&gt;();</pre>
        <p>Without an order column, database row order is not guaranteed. A set is usually the simpler choice when only membership matters.</p>
      </section>

      <section aria-labelledby="join-entity">
        <h2 id="join-entity">When to Use a Join Entity</h2>
        <p>Use an explicit entity for the join table when the association has its own data, such as:</p>
        <ul><li>When the answer was added to the question</li><li>Who approved or voted for the association</li><li>A display order or relevance score</li><li>Status, permissions, or audit information</li></ul>
        <p>In that design, map two one-to-many relationships to an entity such as <code>QuestionAnswer</code> instead of hiding meaningful columns in a direct many-to-many table.</p>
      </section>

      <section aria-labelledby="best-practices">
        <h2 id="best-practices">Many-to-Many Best Practices</h2>
        <ul><li>Use <code>Set</code> when duplicate associations are invalid.</li><li>Define <code>equals()</code> and <code>hashCode()</code> carefully for set elements.</li><li>Maintain both sides with helper methods.</li><li>Do not use <code>CascadeType.REMOVE</code> when the related entity can be shared.</li><li>Keep many-to-many collections lazy and fetch them deliberately.</li><li>Add indexes and unique constraints to the join table.</li><li>Do not include relationship collections in <code>equals()</code> or <code>hashCode()</code>.</li><li>Use a join entity when the relationship itself has attributes.</li></ul>
        <div class="success-box"><strong>Result:</strong> Hibernate stores questions and answers in separate tables and stores their associations in the <code>question_answer</code> join table.</div>
      </section>
    </article>
  `,
  styles: [`
    .many-to-many-page{max-width:82.5rem;padding:4rem 1rem;color:#334155}.eyebrow{color:#0891b2;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.many-to-many-page h1{margin:.5rem 0 1rem;color:#1e3a8a;font-size:clamp(2.3rem,5vw,4rem);font-weight:800}.lead{max-width:58rem;color:#64748b;font-size:1.15rem;line-height:1.8}.many-to-many-page section{max-width:70rem;margin-top:3rem}.many-to-many-page h2{margin-bottom:1rem;color:#1e3a8a;border-left:4px solid #06b6d4;padding-left:.8rem}.many-to-many-page p,.many-to-many-page li{line-height:1.8}.many-to-many-page pre{overflow:auto;padding:1.25rem;border-radius:.75rem;background:#0f172a;color:#e2e8f0;line-height:1.7}.many-to-many-page code{color:#be123c}.many-to-many-page pre code{color:inherit}.table-flow{display:flex;flex-wrap:wrap;align-items:center;gap:.8rem;padding:1.25rem;border:1px solid #bae6fd;border-radius:1rem;background:#f0f9ff;color:#0f3460;font-weight:800}.table-flow b{color:#0891b2;font-size:1.3rem}.note-box,.success-box{margin:1.5rem 0;padding:1rem 1.25rem;border-left:4px solid #06b6d4;border-radius:.5rem;background:#ecfeff}.success-box{border-left-color:#16a34a;background:#f0fdf4}
  `]
})
export class HibernateManyToManyComponent {}
