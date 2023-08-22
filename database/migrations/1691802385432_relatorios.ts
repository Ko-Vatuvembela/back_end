import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'relatorios';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('utilizador_fk')
        .primary()
        .unsigned()
        .references('utilizadores.uid')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('quantidade_post_gramatica').unsigned().defaultTo(0);
      table.integer('quantidade_post_poema').unsigned().defaultTo(0);
      table.integer('quantidade_post_dicionario').unsigned().defaultTo(0);
      table.integer('quantidade_post_proverbio').unsigned().defaultTo(0);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
