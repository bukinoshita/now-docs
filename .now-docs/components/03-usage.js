
    'use strict'

    import React from 'react'

    export default () => <section className="page"><h2 id="usage"><a href="#usage">
     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
     </svg>
    </a>Usage</h2>
<p>Create a <code>docs</code> folder at the root of your project with the documentation inside
of it.</p>
<p>We recommend naming each section of your documentation as <code>01-name.md</code>,
<code>02-name.md</code>, etc.</p>
<p>Start the section with a <code>title</code> and then with the content</p>
<pre><code>{`## title

this is an example
`}</code></pre>
<p>After writing all the documentation, run:</p>
<pre><code>{`$ now-docs
`}</code></pre></section>
    