import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'utilizador_fala_linguas';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('utilizador_fk')
        .primary()
        .unsigned()
        .references('utilizadores.uid')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .integer('lingua_fk')
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
