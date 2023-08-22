import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'postagens';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_postagem').unsigned().primary(),
        table
          .integer('utilizador_fk')
          .unsigned()
          .references('utilizadores.uid')
          .onDelete('CASCADE')
          .onUpdate('CASCADE'),
        table
          .integer('lingua_fk')
          .unsigned()
          .references('linguas.id_lingua')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
      table.text('conteudo');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
