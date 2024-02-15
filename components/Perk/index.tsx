import CustomBaseImage from "../CustomBaseImage/CustomBaseImage";
import { Perk, findPerkByType } from "../../services/utils/helpers/perks";

type PerkProps = {
  perkType: Perk["slug"];
};

const Perk = ({ perkType }: PerkProps) => {
  const perk = findPerkByType({ perkType });

  const PerkIcon = () => {
    return (
      perk && (
        <div className="mr-2">
          <CustomBaseImage
            src={perk.iconPath}
            width={18}
            height={18}
            alt={`ícone ${perk.name}`}
          />
        </div>
      )
    );
  };
  return (
    <div className="flex justify-center items-center">
      <PerkIcon />
      <p className="p3 text-graygray-40">{perk?.name}</p>
    </div>
  );
};

export default Perk;
