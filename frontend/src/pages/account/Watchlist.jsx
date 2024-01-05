import React from "react";
import AccountOptions from "../../components/account/AccountOptions";

const Watchlist = () => {
    return (
        <div className="watchlist">
            <AccountOptions optionType={"watchlist"} />
        </div>
    );
}

export default Watchlist;