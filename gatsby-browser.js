/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "babel-polyfill";
import littlefoot from 'littlefoot'
import wrapWithProvider from "./src/redux/wrapWithProvider";

import 'littlefoot/dist/littlefoot.css'

export const wrapRootElement = wrapWithProvider

export function onInitialClientRender() {
  console.log("littlefoot!")
}
