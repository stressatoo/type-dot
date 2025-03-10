<script>
    import { icons } from "../utils/const/icons.consts.js"
    
    export let icon = undefined;
    export let size = 12;
    export let color = "white";

    $: selectedIcon = icons?.find(i => i.name === icon) ?? console.log("Icona non trovata: ", icon);
</script>

{#if selectedIcon}
<div class="w-{size} h-{size} text-{color}">
    {@html selectedIcon.svg}
</div>
{/if}
