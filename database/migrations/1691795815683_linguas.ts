import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'linguas';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_lingua').unsigned().primary();
      table.string('lingua', 20).unique();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
