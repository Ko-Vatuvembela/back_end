import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'livros';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_livro');
      table.integer('id_bibliografia').references('bibliografias.id_bibliografia');
      table.string('editora');
      table.integer('edicao');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
