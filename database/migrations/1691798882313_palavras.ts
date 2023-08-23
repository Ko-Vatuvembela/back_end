import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'palavras';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_palavra').unsigned().primary();
      table.string('palavra', 45);
      table
        .integer('lingua_fk', 64)
        .unsigned()
        .references('linguas.id_lingua')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
