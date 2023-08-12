import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Utilizador from './Utilizador';
import ClasseGramatical from './ClasseGramatical';
import Palavra from './Palavra';

export default class Significado extends BaseModel {
  @column({ isPrimary: true })
  public idSignificado: string;

  @column()
  public significado: string;

  @column()
  public exemplo: string;

  @column()
  public classeGramaticalFK: string;

  @column()
  public palavraFK: string;

  @column()
  public utilizadorFK: string;

  @belongsTo(() => Utilizador, { foreignKey: 'utilizadorFK' })
  public username: BelongsTo<typeof Utilizador>;

  @belongsTo(() => ClasseGramatical, { foreignKey: 'classeGramaticalFK' })
  public idClasseGramatical: BelongsTo<typeof ClasseGramatical>;

  @belongsTo(() => Palavra, { foreignKey: 'palavraFK' })
  public idPalavra: BelongsTo<typeof Palavra>;
}
