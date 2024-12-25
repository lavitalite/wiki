/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('postcss-each')({
      plugins: {
        afterEach: [
          require('postcss-at-rules-variables')
        ],
        beforeEach: [
          require('postcss-custom-properties')({
            preserve: false
          })
        ]
      }
    }),
    require('tailwindcss'),
    require('autoprefixer')
  ]
}

// module.exports = {
//   plugins: {
//     'postcss-import': {},
//     'tailwindcss/nesting': 'postcss-nesting',
//     'postcss-each': {},
//     'tailwindcss': {},
//     'autoprefixer': {},
//   }
// }