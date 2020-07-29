import trash from 'trash'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs'
import inquirer from 'inquirer'
import getMenu from './lib/getMenu.mjs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// console.log(process)

trash('./packages/components/test/')

async function main() {
  let { menu } = await getMenu()
  console.log(menu[0].children)
}

main()