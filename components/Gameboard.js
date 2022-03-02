import React, {useState, useEffect} from 'react';
import { Text, View, Pressable, StatusBar} from 'react-native';
import MaterialCommunityIcons from'@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

let board = [];
let diceValues = [];
let diceSums = [0, 0, 0, 0, 0, 0];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;

let plusBonus = false;

export default function Gameboard() {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array (NBR_OF_DICES).fill(false));
    const [selectedIcons, setSelectedIcons] = useState(new Array (6).fill(false));
    const [total, setTotal] = useState(0);
    const [bonus, setBonus] = useState(63);
    const [bonusStatus, setBonusStatus] = useState('');
    const [buttonText, setButtonText] = useState('Throw dices')

    function initialize() {
        setNbrOfThrowsLeft(3);
        setStatus('Game has not started.');
        setSelectedDices(new Array (NBR_OF_DICES).fill(false))
        setSelectedIcons(new Array (6).fill(false));
        setTotal(0);
        setBonus(63);
        setButtonText('Throw dices');
        plusBonus = false;
        diceSums = [0, 0, 0, 0, 0, 0];
    }

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable key={"row" + i} onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={50}
                    color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        );
    }

    const numberIcon = [];
    for (let n = 1; n < 7; n++) {
        numberIcon.push(
            <View key={"icons" + n}>
                <Text style={styles.zahl}>{diceSums[n - 1]}</Text>
                <Pressable key={"icon" + n} onPress={() => selectIcons(n)} style={styles.icon}>
                    <MaterialCommunityIcons
                        name={getIcon(n)}
                        key={"icon" + n}
                        size={40}
                        color="#6b705c">
                    </MaterialCommunityIcons>
                </Pressable>
            </View> 
        );
    }

    useEffect(() => {
        checkWinner();
        getBonus();
        if (selectedIcons[1] === true && selectedIcons[2] === true && selectedIcons[3] === true && selectedIcons[4] === true && selectedIcons[5] === true && selectedIcons[6] === true) {
            setButtonText('New game');
        }
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw dices.');
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        }
    }, [nbrOfThrowsLeft, buttonText, selectedIcons]);

    function getDiceColor(i) {
            return selectedDices[i] ? "#cb997e" : "#b7b7a4";
        }

    function getIcon(n) {
        return selectedIcons[n] ? "numeric-" + n + "-circle" : "numeric-" + n + "-circle-outline";
    }

    function selectDice(i) {
        if (nbrOfThrowsLeft === 3) {
            setStatus("Throw the dices first.")
        } else {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
        
    }

    function selectIcons(n) {
        if (nbrOfThrowsLeft === 3) {
            setStatus('You already selected a number.')
        } else if (nbrOfThrowsLeft === 2 || nbrOfThrowsLeft === 1){
            setStatus('Throw 3 times before setting points.')
        }
        else if (!selectedIcons[n]) {
            let icons = [...selectedIcons];
            icons[n] = true;
            setSelectedIcons(icons);
            var sum = 0;
            for (let i = 0; i < 6; i++) {
                if (n === diceValues[i]) {
                    sum += diceValues[i];
                }
            } 
            diceSums[n-1] = sum;
            setTotal(total+sum);
            setBonus(bonus-sum);
            getBonus();
            setNbrOfThrowsLeft(3);
            setSelectedDices(new Array (NBR_OF_DICES).fill(false));
        }
        else {
            setStatus('You already selected this number.')
        }
    }

    function getBonus() {
        if (bonus > 0) {
            setBonusStatus('You are ' +bonus+ ' points away from the bonus.')
        } else if (bonus <= 0 && selectedIcons[1] === true && selectedIcons[2] === true && selectedIcons[3] === true && selectedIcons[4] === true && selectedIcons[5] === true && selectedIcons[6] === true) {
            plusBonus = true;
            setBonusStatus('You got the bonus!')
        } else if (bonus <= 0) {
            setBonusStatus('You got the bonus!')
        }
    }

    function throwDices() {
        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points first.');
        }
        else {
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (buttonText === 'New game') {
                    initialize();
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                    diceValues[i] = randomNumber;
                }
                else if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                    diceValues[i] = randomNumber;
                }
            setNbrOfThrowsLeft(nbrOfThrowsLeft-1); 
            }
        }  
    }

    function checkWinner() {
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
            setSelectedDices(new Array (NBR_OF_DICES).fill(false));
        } else if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points.')
        }
        else {
            setStatus('Select and throw dices again.');
        }
    }

    return(
        <View style={styles.gameboard}>
            <StatusBar barStyle='dark-content'></StatusBar>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button} onPress={() => throwDices()}>
                <Text style={styles.buttonText}>
                    {buttonText}
                </Text>
            </Pressable>
            <Text style={styles.total}>Total: {plusBonus ? total + 35 : total}</Text>
            <Text style={styles.bonus}>{bonusStatus}</Text>
            <View style={styles.points}>{numberIcon}</View>
        </View>
    )
}
