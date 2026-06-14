const { neon } = require('@neondatabase/serverless');

async function main() {
  const sql = neon('postgresql://neondb_owner:npg_bIY2s5fvouGz@ep-hidden-cloud-advkhpql-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require');
  
  try {
    await sql`DROP TABLE repositories CASCADE;`;
    console.log("Table dropped");
  } catch(e) {
    console.error(e);
  }
}

main();
