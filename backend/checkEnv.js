// tsx watch will keep restarting the process, so checking beforehand (see npm start)
const { NOTION_SECRET } = process.env

if (!NOTION_SECRET) {
  console.log(
    'Please provide NOTION_SECRET (https://www.notion.so/my-integrations)'
  )
  process.exit(1)
}
