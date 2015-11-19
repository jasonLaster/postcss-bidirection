import postcss from 'postcss';
import test    from 'ava';
import plugin  from './';


function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            t.same(result.css, output);
            t.same(result.warnings().length, 0);
        }).catch(function (error) {
            console.error(error);
        });
}

/* text alignment */
test('text-align start', t => {
    var input = `.foo {
  text-align: start;
}
    `;
    var output = `.foo {
  text-align: left;
}

html[dir="rtl"] .foo {
  text-align: right;
}
    `;
    return run(t, input, output, { });
});

test('text-align end', t => {
    var input = `.foo {
  text-align: end;
}
    `;
    var output = `.foo {
  text-align: right;
}

html[dir="rtl"] .foo {
  text-align: left;
}
    `;
    return run(t, input, output, { });
});

/* padding, margin, border */
test('padding-inline-start', t => {
    var input = `.foo {
  padding-inline-start: 1px;
}
    `;
    var output = `.foo {
  padding-left: 1px;
}

html[dir="rtl"] .foo {
  padding-right: 1px;
}
    `;
    return run(t, input, output, { });
});

test('padding-inline-end', t => {
    var input = `.foo {
  padding-inline-end: 1px;
}
    `;
    var output = `.foo {
  padding-right: 1px;
}

html[dir="rtl"] .foo {
  padding-left: 1px;
}
    `;
    return run(t, input, output, { });
});

test('border-inline-start', t => {
    var input = `.foo {
  border-inline-start: 1px;
}
    `;
    var output = `.foo {
  border-left: 1px;
}

html[dir="rtl"] .foo {
  border-right: 1px;
}
    `;
    return run(t, input, output, { });
});

test('border-inline-end', t => {
    var input = `.foo {
  border-inline-end: 1px;
}
    `;
    var output = `.foo {
  border-right: 1px;
}

html[dir="rtl"] .foo {
  border-left: 1px;
}
    `;
    return run(t, input, output, { });
});

test('margin-inline-start', t => {
    var input = `.foo {
  margin-inline-start: 1px;
}
    `;
    var output = `.foo {
  margin-left: 1px;
}

html[dir="rtl"] .foo {
  margin-right: 1px;
}
    `;
    return run(t, input, output, { });
});

test('margin-inline-end', t => {
    var input = `.foo {
  margin-inline-end: 1px;
}
    `;
    var output = `.foo {
  margin-right: 1px;
}

html[dir="rtl"] .foo {
  margin-left: 1px;
}
    `;
    return run(t, input, output, { });
});

/* padding-block-start */

/* absolute positioning */
test('offset-inline-start', t => {
    var input = `.foo {
  offset-inline-start: 1px;
}
    `;
    var output = `.foo {
  left: 1px;
}

html[dir="rtl"] .foo {
  right: 1px;
}
    `;
    return run(t, input, output, { });
});

test('offset-inline-end', t => {
    var input = `.foo {
  offset-inline-end: 1px;
}
    `;
    var output = `.foo {
  right: 1px;
}

html[dir="rtl"] .foo {
  left: 1px;
}
    `;
    return run(t, input, output, { });
});