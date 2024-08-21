function del() {
    const a = document.getElementById("dis-con");
    a.parentNode.removeChild(a);
}

Module['locateFile'] = function (path) {
    if (path.endsWith('.wasm')) {
        return 'C:/Users/arnav/Documents/VS Code/BetBetter/algo_wasm.wasm'; // Adjust this path as necessary
    }
    return path;
};

window.addEventListener('load', () => {
    Module.onRuntimeInitialized = () => {
        const calculateBet = Module.cwrap('calculateBet', 'number', ['number', 'number', 'number', 'number', 'number']);

        document.querySelector('.btn-outline-warning').addEventListener('click', () => {
            // Retrieve the input values
            const ratio1 = parseFloat(document.getElementById('bet1').value);
            const ratio2 = parseFloat(document.getElementById('bet2').value);
            const totalBet = parseFloat(document.getElementById('stake').value);

            console.log('Bet 1:', ratio1);
            console.log('Bet 2:', ratio2);
            console.log('Total Bet:', totalBet);

            // Ensure all inputs are valid numbers
            if (isNaN(ratio1) || isNaN(ratio2) || isNaN(totalBet) || ratio1 <= 0 || ratio2 <= 0 || totalBet <= 0) {
                alert("Please enter valid positive numbers for all fields.");
                return;
            }

            // Allocate memory for bet1 and bet2 pointers
            let bet1Ptr = Module._malloc(8);
            let bet2Ptr = Module._malloc(8);

            // Calculate the profit using WebAssembly
            let profit = calculateBet(ratio1, ratio2, totalBet, bet1Ptr, bet2Ptr);

            // Retrieve the bet amounts from memory
            let bet1 = Module.HEAPF64[bet1Ptr / 8];
            let bet2 = Module.HEAPF64[bet2Ptr / 8];

            console.log('Bet 1 Amount:', bet1);
            console.log('Bet 2 Amount:', bet2);
            console.log('Profit:', profit);

            // Free the allocated memory
            Module._free(bet1Ptr);
            Module._free(bet2Ptr);

            // Update the output fields
            document.getElementById('money_on_bet_1').textContent = bet1.toFixed(2);
            document.getElementById('money_on_bet_2').textContent = bet2.toFixed(2);
            document.getElementById('total_profit').textContent = profit > 0 ? profit.toFixed(2) : "0";

            // Handle the case where the output suggests not to bet
            if (profit === -1) {
                alert("Do Not Bet");
            }
        });
    };
});

Module.onRuntimeInitialized = function() {
    console.log("WASM Module Loaded and Initialized");
};
