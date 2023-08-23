import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'significados';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_significado').unsigned().primary();
      table.string('significado', 100);
      table.string('exemplo', 255);
      table
        .integer('classe_gramatical_fk')
        .unsigned()
        .references('classe_gramaticais.id_classe_gramatical')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('utilizador_fk')
        .unsigned()
        .references('utilizadores.uid')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

      table
        .integer('palavra_fk')
        .unsigned()
        .references('palavras.id_palavra')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
