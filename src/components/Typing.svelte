<script>
    import { fetchRandomQuote } from "../utils/randomQuote.utils.js";
    import { generateRandomNumber } from "../utils/randomNumber.utils.js"
    import Icon from "./Icon.svelte";
    import { specialCharacters } from "../utils/const/specialCharacters.consts.js";
    import { testColors } from "../utils/const/colors.consts.js";

    import { onMount, onDestroy } from "svelte";
    
    let targetText = "";
    let userInput = "";
    let startTime = null;
    let timeElapsed = 0; // secondi
    let wpm = 0;
    let typingInterval;
    let isTypingCorrect = true;
    let containerElement;

    onMount(async () => {
        // per evitare problemi di astro, controlliamo che window sia definito
        if(typeof window !== "undefined") {
            window.addEventListener("keydown", handleKeydown);
            window.addEventListener("keypress", handleKeypress);
        }
        targetText = await fetchRandomQuote();
        
        // focus sul container quando la pagina carica
        if (containerElement) {
            containerElement.focus();
        }
    })

    onDestroy(() => {
        // per evitare problemi di astro, controlliamo che window sia definito
        if(typeof window !== "undefined") {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("keypress", handleKeypress);
        }
        if (typingInterval) {
            clearInterval(typingInterval);
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
            }, 200) // ms
        }
    }

    const calculateSpeed = () => {
        const wordsTyped = userInput.trim().split(/\s+/).length;
        wpm = (wordsTyped / timeElapsed) * 60;
    }

    // Gestione diretta degli eventi di tastiera
    const handleKeypress = (event) => {
        event.preventDefault();
        
        if (userInput === targetText) return;
        
        // CONTROLLO ERRORE: se c'è già un errore, stop input
        if (!isTypingCorrect && userInput.length > 0) return;
        
        if (startTime === null) {
            startTyping();
        }
        
        // concatena il char premuto
        const char = event.key;
        userInput += char;
        
        // controlla se input è corretto
        isTypingCorrect = targetText.startsWith(userInput);
        
        // check se l'utente ha completato il testo
        // sì ? clear interval
        if (userInput === targetText) {
            clearInterval(typingInterval);
        }
    }
    
    const handleKeydown = (event) => {
        // se <tab>, refresha la pagina
        if (event.key === "Tab") {
            event.preventDefault();
            location.reload();
            return;
        }
        
        if (event.key === "Backspace") {
            event.preventDefault();
            // cancella l'ultimo char scritto
            if (userInput.length > 0) {
                userInput = userInput.slice(0, -1);
                isTypingCorrect = targetText.startsWith(userInput);
            }
        }
    }

    const focusContainer = () => {
        // focus in container (on click)
        if (containerElement) {
            containerElement.focus();
        }
    }

    // ottiene il colore (e setta la classe tailwind)
    $: getColor = (index) => {
        if (index < userInput.length) {
            if (userInput[index] === targetText[index]) {
                return testColors.RIGHT;
            } else {
                return testColors.WRONG;
            }
        } else {
            return testColors.DEFAULT;
        }
    }
    
    // visualizza il cursore
    $: showCursor = (index) => {
        return index === userInput.length;
    }
</script>

<div class="w-full h-screen bg-blue-950">
    <div class="max-w-md mx-auto">
        <h1 class="text-2xl text-center py-5 text-white">type.</h1>
        
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div 
            id="targetTextContainer" 
            class="flex justify-center items-center p-4 border border-gray-700 rounded-lg"
            tabindex="0"
            bind:this={containerElement}
            on:click={focusContainer}
            role="textbox"
            aria-label="Area digitazione"
        >
            {#if targetText}
                <!-- Testo con cursore -->
                <p class="text-wrap font-mono w-full relative break-all">
                    {#each targetText.split('') as char, i}
                        <!-- se il cursore è visibile (showCursor(i)) -->
                        {#if showCursor(i)}
                            <span class="relative inline-block align-baseline">
                                <span class="absolute h-5 w-0.5 bg-white animate-pulse -left-[1px] top-1"></span>
                                <!-- se il char è uno spazio, aggiungi un non-breaking space -->
                                <span class={getColor(i)}>{char === ' ' ? specialCharacters.NON_BREAKING_SPACE : char}</span>
                            </span>
                        {:else}
                            <!-- se il char è uno spazio, aggiungi un non-breaking space -->
                            <span class={`inline-block align-baseline ${getColor(i)}`}>{char === ' ' ? specialCharacters.NON_BREAKING_SPACE : char}</span>
                        {/if}
                    {/each}
                </p>
            {:else}
                <Icon icon="loading" />
            {/if}
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
        
        <!-- Istruzioni per l'utente -->
        <div class="mt-6 text-center text-gray-400 text-sm">
            <p>Clicca qui sopra e inizia a digitare. Premi Tab per ricominciare.</p>
        </div>
    </div>
    
</div>