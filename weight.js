const sortPlates = plates => 
    [...plates].sort((a, b) => b.weight - a.weight)

const arrayToKeyMap = (array, key) => array.reduce((acc, current) => ({...acc, [current[key]]: current}), {});

// plates [45, 35, 23 , 10, 5, 2.5, 1.25]
// plateMap {45: etc}

const getRange = int => [...Array(int).keys(), int];

const plateCombinationCache = {};

const getPlateCombination = ({plates, plateMap, targetWeight}) => {
    if (plates.length === 0){
        return [];
    }

    const [targetPlate, ...subPlates] = plates;

    if(plateCombinationCache[targetPlate] && plateCombinationCache[targetPlate][targetWeight]) {
        return plateCombinationCache[targetPlate][targetWeight];
    }

    const currentPlate = plateMap[targetPlate];

    const { limit, weight } = currentPlate;

    const output = getRange(limit)
        .filter(numPlates => (targetWeight - (numPlates * weight)) >= 0)
        .map(numPlates => {
            const newWeight = targetWeight - (numPlates * weight);

            const baseReturn = [{id: targetPlate, numPlates: numPlates}];
            if(newWeight > 0) {
                const subPlateCombinations = getPlateCombination({plates: subPlates, plateMap, targetWeight: newWeight});

                const combinations = subPlateCombinations.map(subPlateCombination => [...baseReturn, ...subPlateCombination]);
    
                return combinations;
            } else if (newWeight === 0){
                return [baseReturn];
            }
        })
        .reduce((acc, plateCombinations) => [...acc, ...plateCombinations], []);

    if(!plateCombinationCache[targetPlate]){
        plateCombinationCache[targetPlate] = {};
    }

    if(!plateCombinationCache[targetPlate][targetWeight]){
        plateCombinationCache[targetPlate][targetWeight] = output;
    }

    return output;
}

const getNumberOfPlateChanges = ({plates, combination1, combination2}) => {



}

const getPlateCombinations = (plates, targetWeight) => {
    const plateMap = arrayToKeyMap(plates, 'id');
    const sortedPlates = sortPlates(plates).map(plate => plate.id);

    return getPlateCombination({plates: sortedPlates, plateMap, targetWeight});
}

const getOptimalWeights = ({plates, targetWeights, barWeight = 45}) => {
    const targetPlateWeights = targetWeights.map(weight => weight - barWeight);

    const plateCombinationsPerTarget = targetPlateWeights.map(targetWeight => ({
        targetWeight,
        displayWeight: targetWeight + barWeight,
        combinations: getPlateCombinations(plates, targetWeight)
    }));

    return plateCombinationsPerTarget;
}


const plates = [{
    id: '5',
    name: '5 x 2',
    weight: 10,
    limit: 5
},{
    id: '10',
    name: '10 x 2',
    weight: 20,
    limit: 1
}];

const targetWeights = [
    45,
    55,
    65
];

const output = getOptimalWeights({plates, targetWeights});

console.log(JSON.stringify(output));



// const plates = [{
//     id: '1.25',
//     name: '1.25 x 2',
//     weight: 2.5,
//     limit: 1
// },{
//     id: '2.5',
//     name: '2.5 x 2',
//     weight: 5,
//     limit: 1
// },{
//     id: '5',
//     name: '5 x 2',
//     weight: 10,
//     limit: 2
// },{
//     id: '10',
//     name: '10 x 2',
//     weight: 20,
//     limit: 1
// },{
//     id: '25',
//     name: '25 x 2',
//     weight: 50,
//     limit: 1
// },{
//     id: '35',
//     name: '35 x 2',
//     weight: 70,
//     limit: 1
// }, {
//     id: '45',
//     name: '45 x 2',
//     weight: 90,
//     limit: 3
// }];

// const targetWeights = [
//     130,
//     150,
//     170,
//     170,
//     170,
//     160,
//     150,
//     140
// ];


