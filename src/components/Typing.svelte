<script>
    import { fetchRandomQuote } from "../utils/randomQuote.utils.js";
    import { generateRandomNumber } from "../utils/randomNumber.utils.js"
    import Icon from "./Icon.svelte";

    import { onMount, onDestroy } from "svelte";
    
    let targetText = "";
    let userInput = "";
    let startTime = null;
    let timeElapsed = 0; // secondi
    let wpm = 0;
    let typingInterval;
    let isTypingCorrect = true;

    onMount(async () => {
        if(typeof window !== "undefined") {
            window.addEventListener("keydown", handleKeydown);
        }
        targetText = await fetchRandomQuote();

    })

    onDestroy(() => {
        if(typeof window !== "undefined") {
            window.removeEventListener("keydown", handleKeydown);
        }
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
        console.log(event.data)
        userInput = event.target.value;

        if(userInput.length > 0 && startTime === null)
            startTyping();

        isTypingCorrect = targetText.startsWith(userInput) ? true : false

        if(userInput === targetText) {
            clearInterval(typingInterval)
        }
    }

    const handleCorrection = () => {
        if(!isTypingCorrect && targetText.startsWith(userInput)) {
            isTypingCorrect = true;
        }
    }

    const handleKeydown = (event) => {
        if(event.key === "Tab") {
            event.preventDefault();
            location.reload();
        }
    }

    $: getColor = (index) => {
        console.log("Index:", index, "UserInput:", userInput);

        if (index < userInput.length) {
            if (userInput[index] === targetText[index]) {
                return "text-green-400";  // Verde se corretto
            } else {
                return "text-red-500";  // Rosso se errato
            }
        } else {
            // Se non è stato ancora digitato, colore grigio
            return "text-gray-400";
        }
    }

</script>

<div class="w-full h-screen bg-blue-950">
    <div class="max-w-md mx-auto">
        <h1 class="text-2xl text-center py-5 text-white">type.</h1>
        <div id="targetTextContainer" class="flex justify-center items-center">
            {#if targetText}
                <p class="text-wrap font-mono">
                    {#each targetText.split('') as char, i}
                        <span class={getColor(i)}>{char}</span>
                    {/each}
                </p>
            {:else}
                <Icon icon="loading" />
            {/if}
        </div>


        <div id="typingContainer" class="flex justify-center items-center">
            <div class="relative w-full my-4">
                <input 
                    type="text"
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
                <p class="text-center text-white">{Math.round(wpm)} | {Math.round(timeElapsed)}s</p>
            </div>
        {/if}

        {#if userInput === targetText && targetText}
            <div class="mt-4 flex justify-center items-center">
                <Icon icon="valid" color="white"/>
            </div>
        {/if}
    </div>
</div>
