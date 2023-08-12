import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'palavras';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id_palavra', 64).primary();
      table.string('palavra', 45);
      table.string('lingua_fk', 64);
      table
        .foreign('lingua_fk')
        .references('linguas.id_lingua')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
