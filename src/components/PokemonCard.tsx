import { PokemonCardType } from "../store/model";

const PokemonCard = ({
  id,
  name,
  height,
  weight,
  power,
  description,
  onDelete,
  onEdit,
}: PokemonCardType) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-medium mb-4">{name}</h2>
      <ul className="mb-4">
        {height ? (
          <li>
            <strong>Height:</strong> {height}
          </li>
        ) : null}
        {weight ? (
          <li>
            <strong>Weight:</strong> {weight}
          </li>
        ) : null}
        {power ? (
          <li>
            <strong>Power:</strong> {power}
          </li>
        ) : null}
      </ul>
      {description ? <p className="mb-4">{description}</p> : null}
      <div className="flex justify-end">
        {onEdit ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={() =>
              onEdit({ id, name, height, weight, power, description })
            }
          >
            Edit
          </button>
        ) : null}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => {
            onDelete(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
