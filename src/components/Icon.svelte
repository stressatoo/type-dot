<script>
    import { icons } from "../utils/const/icons.consts.js"
    
    export let icon = undefined;
    export let size = 12;
    export let fill = "white";

    $: selectedIcon = icons?.find(i => i.name === icon);
</script>

{#if selectedIcon}
<div class="w-{size ?? 12} h-{size ?? 12} text-{fill ?? "white"}">
    {@html selectedIcon.svg}
</div>
{/if}
