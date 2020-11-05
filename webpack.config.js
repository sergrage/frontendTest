const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {

	mode: "development",
	entry: "./app/assets/js/app.js",

	output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "./app/temp/js"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "App.js", // string
    // the filename template for entry chunks
  },

   module: {
	  rules: [
	    {
	      test: /\.m?js$/,
	      exclude: /(node_modules|bower_components)/,
	      use: {
	        loader: 'babel-loader',
	        options: {
	          presets: ['@babel/preset-env']
	        }
	      }
	    }
	  ]
	}

  // watch: true
}