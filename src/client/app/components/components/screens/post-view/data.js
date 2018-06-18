const contentMarkup = `
  <p><strong>NOTE: This is a cross-post from <a href="#">my newsletter</a>. I publish each email two weeks after it’s sent. Subscribe to get more content like this earlier right in your inbox! 💌</strong></p>
  <p>The goal of this post is to not only help you understand what prop drilling is (some also refer to it as “threading”), but also when it can be a problem and mechanisms you can use to side-step or avoid it.</p>

  <h3>What is prop drilling?</h3>
  <p>Prop drilling (also called “threading”) refers to the process you have to go through to get data to parts of the React Component tree. Let’s look at a very simple example of a stateful component (yes, it’s my favorite component example):</p>
  <pre><code>class Toggle extends React.Component {<br>  state = {on: false}<br>  toggle = () =&gt; this.setState(<br>    ({on}) =&gt; ({on: !on})<br>  )<br>  render() {<br>    return (<br>      &lt;div&gt;<br>        &lt;div&gt;<br>          The button is {this.state.on ? 'on' : 'off'}<br>        &lt;/div&gt;<br>        &lt;button onClick={this.toggle}&gt;<br>          Toggle<br>        &lt;/button&gt;<br>      &lt;/div&gt;<br>    )<br>  }<br>}</code></pre>
  <p>Simple enough, the <code>Switch</code> needs a reference to the <code>toggle</code> and <code>on</code> state, so we're sending some props there. Let's refactor it once more to add another layer in our component tree:</p>

  <h3>Why is prop drilling good?</h3>
  <p>Did you ever work in an application that used global variables? What about an AngularJS application that leveraged non-isolate <code>$scope</code> inheritance? The reason that the community has largely rejected these methodologies is because it inevitably leads to a very confusing data model for your application. It becomes difficult for anyone to find where data is initialized, where it's updated, and where it's used. <strong>Answering the question of "can I modify/delete this code without breaking anything?" is difficult to answer in that kind of a world. And that's the question you should be optimizing for as you code.</strong></p>

  <h3>What problems can prop drilling cause?</h3>
  <p>In our contrived example above, there’s absolutely no problem. But as an application grows, you may find yourself drilling through many layers of components. It’s not normally a big deal when you write it out initially, but after that code has been worked in for a few weeks, things start to get unwieldy for a few use cases:</p>
  <ul>
    <li>Refactor the shape of some data (ie: <code class="markup--code markup--li-code">{user: {name: 'Joe West'}}</code> -&gt; <code class="markup--code markup--li-code">{user: {firstName: 'Joe', lastName: 'West'}}</code>)</li>
    <li>Over-forwarding props (passing more props than is necessary) due to (re)moving a component that required some props but they’re no longer needed.</li>
    <li>Under-forwarding props + abusing <code className="markup--code markup--li-code">defaultProps</code> so you're not made aware of missing props (also due to (re)moving a component).</li>
    <li>Renaming props halfway through (ie <code className="markup--code markup--li-code">&lt;Toggle on={this.state.on} /&gt;</code> renders <code className="markup--code markup--li-code">&lt;Switch toggleIsOn={on} /&gt;</code>) making keeping track of that in your brain difficult.</li>
  </ul>
  <p>There are various other situations where prop drilling can cause some real pain in the process of refactoring especially.</p>

  <h3>How can we avoid problems with prop drilling?</h3>
  <p>One of the things that really aggravates problems with prop drilling is breaking out your render method into multiple components unnecessarily. You'll be surprised how simple a big render method can be when you just inline as much as you can. There's no reason to breaking things out prematurely. Wait until you really need to reuse a block before breaking it out. Then you wont need to pass props anyway!</p>
  <blockquote>Fun fact, there’s nothing technically stopping you from writing your entire application as a single React Component. It can manage the state of your whole application and you’d have one giant render method… I am not advocating this though… Just something to think about&nbsp;:)</blockquote>
  <p>Keep state as close to where it’s relevant as possible. If only one section of your app needs some state, then manage that in the least common parent of those components rather than putting it at the highest level of the app. Learn more about state management from my blog post: Application State Management.</p>

  <h4>Compound Components + Context API = ❤️</h4>
  <p>In particular, the Context API makes compound components much easier to make more flexible.</p>

  <h3>Conclusion</h3>
  <p>Prop drilling can be a good thing, and it can be a bad thing. Following some good practices as mentioned above, you can use it as a feature to make your application more maintainable. Good luck!</p>
`;

const data = {
  post: {
    id: 1,
    blogId: 1,
    authorId: 1,
    title: 'Prop Drilling',
    subTitle: 'What it is, why it’s good, why it’s bad, and how to avoid common problems with it.',
    contentMarkup: { __html: contentMarkup },
    isLargePreview: false,
    previewImgUrl: 'https://cdn-images-1.medium.com/max/1000/1*bWg9ZF6pzx0vddYqAnf5FA.jpeg',
    fullsizeImgUrl: 'https://cdn-images-1.medium.com/max/2000/1*bWg9ZF6pzx0vddYqAnf5FA.jpeg',
    date: 'May 21',
    readTimeEstimate: '6 min',
  },
  user: {
    id: 1,
    fullName: 'Kent C. Dodds',
    avatarUrl: 'https://cdn-images-1.medium.com/fit/c/120/120/1*9ZtET_L1852yXaDZJUo9CQ.png',
    bio: 'Making software development more accessible · Husband, Father, Mormon, Teacher, OSS, GDE, @TC39 · @PayPalEng @eggheadio @FrontendMasters @JavaScriptAir · #JS',
  },
};

export default data;
