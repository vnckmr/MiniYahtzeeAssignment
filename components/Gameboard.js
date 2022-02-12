import React, {useState, useEffect} from 'react';
import { Text, View, Pressable} from 'react-native';
import MaterialCommunityIcons from'@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { Col, Grid, Row } from "react-native-easy-grid";

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;

let icons = [];

export default function Gameboard() {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array (NBR_OF_DICES).fill(false));
    const [selectedIcons, setSelectedIcons] = useState(new Array (6).fill(false));
    const [total, setTotal] = useState(0);
    const [icon, setIcon] = useState(false);
    const [points, setPoints] = useState(0);

    const selectIcon = () => {
        setIcon(!icon);
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
            <Grid>
                <Col>
                <Row>
            <Text>{points}</Text>
            </Row>
            <Row>
            <Pressable key={"icon" + n} onPress={() => selectIcons(n)}>
                <MaterialCommunityIcons
                    name={getIcon(n)}
                    key={"icon" + n}
                    size={40}
                    color="#6b705c">
                </MaterialCommunityIcons>
            </Pressable>
            </Row>
            </Col>
            </Grid>
        );
    }

    useEffect(() => {
        checkWinner();
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw dices.');
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
        }
    }, [nbrOfThrowsLeft]);

    function getDiceColor(i) {
            return selectedDices[i] ? "#cb997e" : "#b7b7a4";
        }

    function getIcon(n) {
        return selectedIcons[n] ? "numeric-" + n + "-circle" : "numeric-" + n + "-circle-outline";
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function selectIcons(n) {
        let icons = [...selectedIcons];
        icons[n] = selectedIcons[n] ? false : true;
        setSelectedIcons(icons);
    }

    function throwDices() {
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }


    function checkWinner() {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setStatus('You won');
        } else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        } else if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points.');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        } else {
            setStatus('Select and throw dices again.');
        }
    }

    return(
        <View style={styles.gameboard}>
            <View style={styles.flex}>{row}</View>
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button} onPress={() => throwDices()}>
                <Text style={styles.buttonText}>
                    Throw dices
                </Text>
            </Pressable>
            <Text style={styles.total}>Total: {total}</Text>
            <View style={styles.flex}>{numberIcon}</View>
        </View>
    )
}