import React, { useState } from "react";
interface Param {
    id: number;
    name: string;
    options: (string | number | string[])[];
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}
interface Props {
    params: Param[];
    model: Model;
}
const initialParams: Param[] = [
    { id: 1, name: "Назначение", options: ["повседневное", "вечернее", "спортивное", "домашняя одежда"] },
    { id: 2, name: "Цвет", options: ["красный", "белый", "синий", "черный", "зеленый", "желтый"] },
    { id: 3, name: "Сезон", options: ["зима", "лето", "осень", "весна"] },
    { id: 4, name: "Расширяющий параметр", options: ["не только текстовый", 7, ["со", "списком", "значений"]] }
];

const initialModel: Model = {
    paramValues: []
};

const ParamEditor: React.FC = () => {
    const [model, setModel] = useState<Model>(initialModel);
    const [showTable, setShowTable] = useState<boolean>(false);

    const handleChange = (paramId: number, newValue: string) => {
        setModel((prevModel) => {
            const updatedValues = prevModel.paramValues.some((param) => param.paramId === paramId)
                ? prevModel.paramValues.map((param) =>
                    param.paramId === paramId ? { ...param, value: newValue } : param
                )
                : [...prevModel.paramValues, { paramId, value: newValue }];

            return { paramValues: updatedValues };
        });
    };

    const getModel = () => {
        const completeModel: Model = {
            paramValues: initialParams.map((param) => {
                const existingValue = model.paramValues.find((p) => p.paramId === param.id)?.value;
                const value = existingValue || param.options[0];
                const stringValue = Array.isArray(value) ? value.join(', ') : String(value);
                return {
                    paramId: param.id,
                    value: stringValue
                };
            })
        };

        setModel(completeModel);
        setShowTable(true);
    };
    const handleOptionDisplay = (option: string | number | string[]) => {
        if (Array.isArray(option)) {
            return option.join(', ');
        }
        return option;
    };

    return (
        <div>
            <img src="/logo.png" alt="Selsup Logo" />
            <h2>Редактор параметров</h2>

            {initialParams.map((param) => {
                const paramValue = model.paramValues.find((p) => p.paramId === param.id)?.value || param.options[0];

                return (
                    <div style={{
                        width: '100%', marginBottom: '20px', marginTop: '20px',
                    }} key={param.id}>
                        <label>{param.name}:</label>
                        <select style={{
                            marginLeft: '10px',
                        }} value={paramValue} onChange={(e) => handleChange(param.id, e.target.value)}>
                            {param.options.map((option, index) => (
                                <option key={index} value={handleOptionDisplay(option)}>
                                    {handleOptionDisplay(option)}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            })}

            <button onClick={getModel}>Получить модель</button>
            <h2>{showTable ? "Итоговая модель" : ""}</h2>
            {showTable && (
                <table style={{
                    width: '70%', marginTop: '20px', border: '2px solid lightgray', borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr>
                            <th style={{
                                width: '50%',
                                border: '2px solid lightgray',
                                borderCollapse: 'collapse'
                            }}>Название</th>
                            <th>Значение</th>
                        </tr>
                    </thead>
                    <tbody>
                        {model.paramValues.map((paramValue) => {
                            const paramName = initialParams.find((p) => p.id === paramValue.paramId)?.name || "Неизвестный параметр";
                            return (
                                <tr style={{ width: '50%', border: '2px solid lightgray', borderCollapse: 'collapse', textAlign: 'center' }}
                                    key={paramValue.paramId}>
                                    <td style={{ width: '50%', border: '2px solid lightgray', borderCollapse: 'collapse' }}>{paramName}</td>
                                    <td>{paramValue.value}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ParamEditor;
