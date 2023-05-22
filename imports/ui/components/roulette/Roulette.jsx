import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import RouletteWatcher from "../../../api/classes/client/RouletteWatcher";


const Roulette = ({ data }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [rouletteData, setRouletteData] = useState(data);
    const [pattern, setPattern] = useState(0);

    const handleSpinClick = () => {
        let requiredPattern = 10
        let newPrizeNumber = Math.floor(Math.random() * data.length);

        if (requiredPattern === pattern) {
            // console.log('win')
            if (data[newPrizeNumber].status === false) return handleSpinClick();
        } else {
            // console.log('lose')
            if (data[newPrizeNumber].status === true) return handleSpinClick();
        }
        setPattern(pattern + 1);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);

    };

    useEffect(() => {
        const addShortString = data.map((item) => {
            return {
                completeOption: item.text,
                status: item.status,
                option:
                    item.text.length >= 30
                        ? item.text.substring(0, 30).trimEnd() + "..."
                        : item.text
            };
        });
        setRouletteData(addShortString);
    }, [data]);

    return (
        <>
            <div align="center" className="roulette-container" >
                <Wheel
                    mustStartSpinning={mustSpin}
                    spinDuration={[0.4]}
                    prizeNumber={prizeNumber}
                    data={rouletteData}
                    outerBorderColor={["#ccc"]}
                    outerBorderWidth={[9]}
                    innerBorderColor={["#f2f2f2"]}
                    radiusLineColor={["tranparent"]}
                    radiusLineWidth={[1]}
                    textColors={["#f5f5f5"]}
                    textDistance={55}
                    fontSize={[16]}
                    backgroundColors={[
                        "#3f297e",
                        "#175fa9",
                        "#169ed8",
                        "#239b63",
                        "#64b031",
                        "#efe61f",
                        "#f7a416",
                        "#e6471d",
                        "#dc0936",
                        "#e5177b",
                        "#be1180",
                        "#871f7f"
                    ]}
                    onStopSpinning={() => {
                        setMustSpin(false);
                    }}
                />

            </div>
            <a className="btn_primary w-button" onClick={handleSpinClick}>
                Spin
            </a>
            <p className="p_style_1 text-center">  Test: {!mustSpin ? rouletteData[prizeNumber].completeOption : "Loading..."}</p>
            {/* 
                status: {!mustSpin ? rouletteData[prizeNumber].status ? "WIN" : "LOSE" : "Loading..."} */}

        </>
    );
};

export default Roulette;
