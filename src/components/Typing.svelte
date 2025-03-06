<script>
    import { fetchRandomQuote } from "../utils/randomQuote.utils.js";
    import { onMount } from "svelte";
    
    let targetText = "Loading...";
    let userInput = "";
    let startTime = null;
    let timeElapsed = 0; // secondi
    let wpm = 0;
    let typingInterval;
    let isTypingCorrect = true;

    onMount(async () => {
        targetText = await fetchRandomQuote();
    })

    const startTyping = () => {
        if(startTime === null) {
            startTime = Date.now();
            typingInterval = setInterval(() => {
                if(isTypingCorrect) {
                    timeElapsed = (Date.now() - startTime) / 1000;
                    calculateSpeed();
                }
            }, 1) // ogni 1ms
        }
    }

    const calculateSpeed = () => {
        const wordsTyped = userInput.trim().split(/\s+/).length;
        wpm = (wordsTyped / timeElapsed) * 60;
    }

    const handleInput = (event) => {
        userInput = event.target.value;

        if(userInput.length > 0 && startTime === null)
            startTyping();

        isTypingCorrect = targetText.startsWith(userInput) ? true : false

        if(userInput === targetText) {
            stopTyping();
        }
    }

    const stopTyping = () => clearInterval(typingInterval);

    const handleCorrection = () => {
        if(!isTypingCorrect && targetText.startsWith(userInput)) {
            isTypingCorrect = true;
        }
    }

    const generateSVGBackground = (text) => {
        const encodedText = encodeURIComponent(text);
        return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="5" y="19" style="font: bold 16px Arial;">${encodedText}</text></svg>')`;
    };
</script>

<style>
    .wpm {
        font-size: 1.2rem;
        font-weight: bold;
    }
</style>

<div class="max-w-md mx-auto mt-10">
    <h1 class="text-2xl font-bold text-center mb-5">type.</h1>

        <div id="typingContainer" class="flex justify-center items-center">
            <div class="relative w-full mb-4">
                <input 
                    bind:value={userInput}
                    on:input={handleInput}
                    on:blur={handleCorrection}
                    class="w-full px-4 py-2 border rounded-md text-black focus:outline-none resize-none break-words whitespace-pre-wrap"
                    style="background: {generateSVGBackground(targetText)} no-repeat; background-size: 100% auto;"
                />
        </div>
    </div>

    {#if timeElapsed > 0}
        <div class="mt-4 text-lg wpm">
            <p class="text-center font-semibold">wpm: {wpm}</p>
            <p class="text-center">time: {timeElapsed}s</p>
        </div>
    {/if}

    {#if userInput === targetText}
        <div class="mt-4 text-center">
        <p class="text-xl font-bold">pass!</p>
        </div>
    {/if}
</div>