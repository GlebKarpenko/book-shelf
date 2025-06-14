<script setup lang="ts">
import { defineProps, PropType, defineEmits } from "vue";

const props = defineProps({
  tabs: {
    type: Array as PropType<{ id: string, name: string }[]>,
    required: true
  },
  tabsSecondary: {
    type: Array as PropType<{ id: string, name: string }[]>,
    required: false,
    default: undefined
  }
});

const emit = defineEmits(['select-tab']);

const handleSelectTab = (tabId: string) => {
  emit('select-tab', tabId);
};
</script>

<template>
  <div class="home-card">
    <div class="welcome-section">
      <h1>Welcome to Sources Manager</h1>
      <p>
        This is a centralized place where you can query different book APIs.
        Navigate to any tab and enter your search query to see results from various sources.
      </p>
    </div>

    <!-- Supported sources -->
    <div class="sources-section">
      <h2>Active Sources</h2>
      <div class="sources-grid">
        <button
          v-for="tab in props.tabs.filter(tab => tab.id !== 'home')"
          :key="tab.id"
          class="source-button"
          @click="handleSelectTab(tab.id)"
        >
          <span>{{ tab.name }}</span>
        </button>
      </div>
    </div>

    <!-- Supported sources with different styling-->
    <div class="sources-section" v-if="props.tabsSecondary">
      <h2>Unmaintained sources</h2>
      <div class="sources-grid">
        <button
          v-for="tab in props.tabsSecondary.filter(tab => tab.id !== 'home')"
          :key="tab.id"
          class="inactive-source-button"
          @click="handleSelectTab(tab.id)"
        >
          <span>{{ tab.name }}</span>
        </button>
      </div>
    </div>

    <div class="tips-section">
      <h3>Quick Tips</h3>
      <ul>
        <li>Use specific titles, authors, or ISBN numbers for more accurate results</li>
        <li>Each source has different strengths - try multiple for comprehensive results</li>
        <li>Save your favorite books for later reference</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables.scss";

.home-card {
  background-color: $main-bgcolor;
  border-radius: 8px;
  box-shadow: $wide-shadow;
  padding: $manager-subcontent-padding;
  max-width: $manager-subcontent-mxwidth;
  margin: 0 auto;

  .welcome-section {
    margin-bottom: 2rem;

    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
    }
  }

  .sources-section {
    h2 {
      font-size: 1.25rem;
      font-weight: $med-thick;
      margin-bottom: 0.75rem;
    }

    .sources-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      
      @media (min-width: $small-width) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  .source-button, .inactive-source-button {
    background-color: #e6f0fd;
    color: #1a56db;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.05);
    font-weight: 500;
  }

  .source-button {
    background-color: $active-source-bgcolor;
    color: $active-source-color;

    &:hover {
      background-color: $active-source-hover-bgcolor;
    }
  }

  .inactive-source-button {
    background-color: $inactive-source-bgcolor;
    color: $inactive-source-color;

    &:hover {
      background-color: $inactive-source-hover-bgcolor;
    }
  }

  .tips-section {
    margin-top: 2rem;
    padding: 1rem;
    background-color: #f3f4f6;
    border-radius: 0.5rem;

    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    ul {
      list-style-type: disc;
      padding-left: 1.25rem;

      li {
        margin-bottom: 0.25rem;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>