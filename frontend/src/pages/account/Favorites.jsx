import React from "react";
import AccountOptions from "../../components/account/AccountOptions";

const Favorites = () => {

    return (
        <div className="favorites">
            <AccountOptions optionType={"favorites"} />
        </div>
    );
}

export default Favorites;