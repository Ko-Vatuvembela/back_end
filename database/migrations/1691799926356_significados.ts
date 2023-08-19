import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'significados';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id_significado', 64).primary();
      table.string('significado', 100);
      table.string('exemplo', 255);
      table.string('classe_gramatical_fk', 64);
      table.string('utilizador_fk', 40);
      table.string('palavra_fk', 64);
      table
        .foreign('classe_gramatical_fk')
        .references('classe_gramaticais.id_classe_gramatical')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('utilizador_fk')
        .references('utilizadores.uid')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('palavra_fk')
        .references('palavras.id_palavra')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
