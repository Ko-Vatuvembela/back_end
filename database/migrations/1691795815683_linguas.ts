import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'linguas';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id_lingua', 64).primary();
      table.string('lingua', 20);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
