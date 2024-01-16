import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'bibliografias';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_bibliografia');
      table.string('nome_autor');
      table.string('sobrenome_autor');
      table.string('titulo');
      table.integer('ano');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
