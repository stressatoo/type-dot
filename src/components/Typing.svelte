<script>
    import { fetchRandomQuote } from "../utils/randomQuote.utils.js";
    import { generateRandomNumber } from "../utils/randomNumber.utils.js"
    import Icon from "./Icon.svelte";

    import { onMount } from "svelte";
    
    let targetText;
    let userInput = "";
    let startTime = null;
    let timeElapsed = 0; // secondi
    let wpm = 0;
    let typingInterval;
    let isTypingCorrect = true;
    let error = false;

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
            }, 200) // ogni 1ms
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
            console.log("here, take it...")
            clearInterval(typingInterval)
            console.log("so basically", error)
            error = true;
            console.log("now tru", error)
        }
    }

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
    * {
        color: white;
    }
    .wpm {
        font-size: 1.2rem;
        font-weight: bold;
    }
</style>

<div class="w-full h-screen bg-blue-950">
    <div class="max-w-md mx-auto">
        <h1 class="text-2xl text-center py-5">type.</h1>
        <div id="targetTextContainer" class="flex justify-center items-center">
            {#if targetText}
                <p class="text-wrap font-mono">{targetText}</p>
            {:else}
                <Icon icon="loading" class=""/>
            {/if}
        </div>


        <div id="typingContainer" class="flex justify-center items-center">
            <div class="relative w-full my-4">
                <input 
                    bind:value={userInput}
                    on:input={handleInput}
                    on:blur={handleCorrection}
                    id="{generateRandomNumber()}-input"
                    class="w-full px-4 py-2 border-b-2 rounded-md focus:outline-none resize-none break-words whitespace-pre-wrap"
                    style="color: black;"
                />
        </div>
        </div>
    
        {#if timeElapsed > 0}
            <div class="mt-4 text-lg wpm">
                <p class="text-center">{Math.round(wpm)} | {Math.round(timeElapsed)}s</p>
            </div>
        {/if}

        {#if error}
            <p>Ciaooo{error}</p>
        {/if}

        {#if userInput === targetText && targetText}
            <div class="mt-4 text-center">
            <p class="text-xl font-bold">iconToBe</p>
            </div>
        {/if}
    </div>
</div>
