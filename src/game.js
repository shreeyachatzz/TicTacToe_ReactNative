import { View, Text, StyleSheet,TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react';
import Board from './board';

const game = () => {

    const initialBoard=[
        ['','',''],
        ['','',''],
        ['','',''],
    ];

    const [board, setBoard] = useState(initialBoard);
    const [player,setPlayer] = useState('O');
    const [winner,setWinner] = useState('');

    useEffect(()=>{
        checkWinner();
    },[board]);

    const handlePress = (rowIndex, cellIndex) => {
        if (board[rowIndex][cellIndex] === '' && !winner) {
          const newBoard = [...board];
          newBoard[rowIndex][cellIndex] = player;
          setBoard(newBoard);
          setPlayer(player === 'O' ? 'X' : 'O');
        }
      };
    const checkWinner = () => {
        //check rows
        for(let i=0; i<3;i++){
            if(
                board[i][0] !== '' &&
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]
            ){
                setWinner(board[i][0]);
                break;
            }
        }
        //check columns
        for(let i=0; i<3;i++){
            if(
                board[0][i] !== '' &&
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]
            ){
                setWinner(board[0][i]);
                break;
            }
        }
        //check diagonals
        if(
            board[1][1] !== '' &&
            ((
                ((board[0][0]===board[1][1])&&
                (board[1][1]===(board[2][2])))
            )||(
                ((board[0][2]===board[1][1])&&
                (board[1][1]===(board[2][0])))
            ))
        ){
            setWinner(board[1][1]);
        }
    };

    const resetBoard = () =>{
        setBoard(initialBoard);
        setPlayer('O');
        setWinner('')
    }

    useEffect(()=>{
        if(winner){
            Alert.alert(`Player ${winner} won!!`,' ',
            [{text:'OK', onPress: resetBoard}]);
        }
    }, [winner]);

    useEffect(()=>{
        if(!winner){
            const isBoardFull = board.every((row)=> row.every((cell)=> cell !==''));
            if(isBoardFull){
                Alert.alert('It\'s a tie!!',' ',
            [{text:'OK', onPress: resetBoard}]);
            }
        }
    },[board]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Board board={board} onPress={handlePress}/>
      <TouchableOpacity
      style={styles.resetButton}
      onPress ={resetBoard}
      >
        <Text style={styles.resetButtonText}>RESET</Text>
      </TouchableOpacity>
    </View>
  )
}

export default game

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
        fontSize :30,
        fontWeight:"bold",
        marginBottom:20
    },
    resetButton:{
        backgroundColor: '#3498db',
        padding: 20,
        borderRadius:20,
        marginTop: 20,
        fontSize: 30,
    },
    resetButtonText: {
        color:'#fff',
        textAlign: "center",
        
    },
  });