
// Extracted Inline Events
document.addEventListener('DOMContentLoaded', () => {

  const el_event_hook_3_click = document.getElementById('event-hook-3');
  if(el_event_hook_3_click) {
    el_event_hook_3_click.addEventListener('click', function(event) {
      closeMob();
    });
  }
  const el_event_hook_4_click = document.getElementById('event-hook-4');
  if(el_event_hook_4_click) {
    el_event_hook_4_click.addEventListener('click', function(event) {
      closeMob();
    });
  }
  const el_event_hook_5_click = document.getElementById('event-hook-5');
  if(el_event_hook_5_click) {
    el_event_hook_5_click.addEventListener('click', function(event) {
      closeMob();
    });
  }
  const el_event_hook_6_click = document.getElementById('event-hook-6');
  if(el_event_hook_6_click) {
    el_event_hook_6_click.addEventListener('click', function(event) {
      closeMob();
    });
  }
  const el_event_hook_7_click = document.getElementById('event-hook-7');
  if(el_event_hook_7_click) {
    el_event_hook_7_click.addEventListener('click', function(event) {
      closeMob();
    });
  }
  const el_event_hook_8_click = document.getElementById('event-hook-8');
  if(el_event_hook_8_click) {
    el_event_hook_8_click.addEventListener('click', function(event) {
      scrollTo2('destinations');
    });
  }
  const el_event_hook_9_click = document.getElementById('event-hook-9');
  if(el_event_hook_9_click) {
    el_event_hook_9_click.addEventListener('click', function(event) {
      scrollTo2('city-guide');
    });
  }
  const el_event_hook_10_click = document.getElementById('event-hook-10');
  if(el_event_hook_10_click) {
    el_event_hook_10_click.addEventListener('click', function(event) {
      scrollTo2('ai-trip-builder');
    });
  }
  const el_event_hook_11_click = document.getElementById('event-hook-11');
  if(el_event_hook_11_click) {
    el_event_hook_11_click.addEventListener('click', function(event) {
      scrollTo2('plans');
    });
  }
  const el_event_hook_12_click = document.getElementById('event-hook-12');
  if(el_event_hook_12_click) {
    el_event_hook_12_click.addEventListener('click', function(event) {
      scrollTo2('clips');
    });
  }
  const el_event_hook_13_click = document.getElementById('event-hook-13');
  if(el_event_hook_13_click) {
    el_event_hook_13_click.addEventListener('click', function(event) {
      scrollTo2('travel-insights');
    });
  }
  const el_event_hook_14_click = document.getElementById('event-hook-14');
  if(el_event_hook_14_click) {
    el_event_hook_14_click.addEventListener('click', function(event) {
      scrollTo2('faq');
    });
  }
  const el_hc_toggle_btn_click = document.getElementById('hc-toggle-btn');
  if(el_hc_toggle_btn_click) {
    el_hc_toggle_btn_click.addEventListener('click', function(event) {
      toggleHighContrast();
    });
  }
  const el_lang_btn_click = document.getElementById('lang-btn');
  if(el_lang_btn_click) {
    el_lang_btn_click.addEventListener('click', function(event) {
      toggleLangMenu();
    });
  }
  const el_event_hook_15_click = document.getElementById('event-hook-15');
  if(el_event_hook_15_click) {
    el_event_hook_15_click.addEventListener('click', function(event) {
      setLanguage('en','🇮🇳','EN');
    });
  }
  const el_event_hook_16_click = document.getElementById('event-hook-16');
  if(el_event_hook_16_click) {
    el_event_hook_16_click.addEventListener('click', function(event) {
      setLanguage('hi','🇮🇳','हि');
    });
  }
  const el_event_hook_17_click = document.getElementById('event-hook-17');
  if(el_event_hook_17_click) {
    el_event_hook_17_click.addEventListener('click', function(event) {
      setLanguage('bn','🇧🇩','বাং');
    });
  }
  const el_event_hook_18_click = document.getElementById('event-hook-18');
  if(el_event_hook_18_click) {
    el_event_hook_18_click.addEventListener('click', function(event) {
      setLanguage('ta','🇮🇳','த');
    });
  }
  const el_event_hook_19_click = document.getElementById('event-hook-19');
  if(el_event_hook_19_click) {
    el_event_hook_19_click.addEventListener('click', function(event) {
      setLanguage('te','🇮🇳','తె');
    });
  }
  const el_event_hook_20_click = document.getElementById('event-hook-20');
  if(el_event_hook_20_click) {
    el_event_hook_20_click.addEventListener('click', function(event) {
      setLanguage('mr','🇮🇳','म');
    });
  }
  const el_event_hook_21_click = document.getElementById('event-hook-21');
  if(el_event_hook_21_click) {
    el_event_hook_21_click.addEventListener('click', function(event) {
      scrollTo2('ai-trip-builder');
    });
  }
  const el_hbg_click = document.getElementById('hbg');
  if(el_hbg_click) {
    el_hbg_click.addEventListener('click', function(event) {
      openMob();
    });
  }
  const el_event_hook_22_click = document.getElementById('event-hook-22');
  if(el_event_hook_22_click) {
    el_event_hook_22_click.addEventListener('click', function(event) {
      scrollTo2('destinations');
    });
  }
  const el_event_hook_23_click = document.getElementById('event-hook-23');
  if(el_event_hook_23_click) {
    el_event_hook_23_click.addEventListener('click', function(event) {
      scrollTo2('plans');
    });
  }
  const el_ai_gen_btn_click = document.getElementById('ai-gen-btn');
  if(el_ai_gen_btn_click) {
    el_ai_gen_btn_click.addEventListener('click', function(event) {
      generateAITrip();
    });
  }
  const el_btn_see_more_click = document.getElementById('btn-see-more');
  if(el_btn_see_more_click) {
    el_btn_see_more_click.addEventListener('click', function(event) {
      showAllDests();
    });
  }
  const el_event_hook_24_click = document.getElementById('event-hook-24');
  if(el_event_hook_24_click) {
    el_event_hook_24_click.addEventListener('click', function(event) {
      switchPlan('2d', document.getElementById("event-hook-24"));
    });
  }
  const el_event_hook_25_click = document.getElementById('event-hook-25');
  if(el_event_hook_25_click) {
    el_event_hook_25_click.addEventListener('click', function(event) {
      switchPlan('3d', document.getElementById("event-hook-25"));
    });
  }
  const el_event_hook_26_click = document.getElementById('event-hook-26');
  if(el_event_hook_26_click) {
    el_event_hook_26_click.addEventListener('click', function(event) {
      switchPlan('5d', document.getElementById("event-hook-26"));
    });
  }
  const el_event_hook_27_click = document.getElementById('event-hook-27');
  if(el_event_hook_27_click) {
    el_event_hook_27_click.addEventListener('click', function(event) {
      switchPlan('7d', document.getElementById("event-hook-27"));
    });
  }
  const el_event_hook_28_click = document.getElementById('event-hook-28');
  if(el_event_hook_28_click) {
    el_event_hook_28_click.addEventListener('click', function(event) {
      closeVid();
    });
  }
  const el_event_hook_29_click = document.getElementById('event-hook-29');
  if(el_event_hook_29_click) {
    el_event_hook_29_click.addEventListener('click', function(event) {
      closeDestModal();
    });
  }
  const el_event_hook_30_click = document.getElementById('event-hook-30');
  if(el_event_hook_30_click) {
    el_event_hook_30_click.addEventListener('click', function(event) {
      
                closeDestModal();
                scrollTo2('plans');
              ;
    });
  }
  const el_event_hook_31_click = document.getElementById('event-hook-31');
  if(el_event_hook_31_click) {
    el_event_hook_31_click.addEventListener('click', function(event) {
      closeDestModal();
    });
  }
  const el_event_hook_32_click = document.getElementById('event-hook-32');
  if(el_event_hook_32_click) {
    el_event_hook_32_click.addEventListener('click', function(event) {
      scrollTo2('destinations');
    });
  }
  const el_event_hook_33_click = document.getElementById('event-hook-33');
  if(el_event_hook_33_click) {
    el_event_hook_33_click.addEventListener('click', function(event) {
      scrollTo2('plans');
    });
  }
  const el_event_hook_34_click = document.getElementById('event-hook-34');
  if(el_event_hook_34_click) {
    el_event_hook_34_click.addEventListener('click', function(event) {
      submitEmail();
    });
  }
  const el_musafir_launcher_click = document.getElementById('musafir-launcher');
  if(el_musafir_launcher_click) {
    el_musafir_launcher_click.addEventListener('click', function(event) {
      musafirToggle();
    });
  }
  const el_event_hook_35_error = document.getElementById('event-hook-35');
  if(el_event_hook_35_error) {
    el_event_hook_35_error.addEventListener('error', function(event) {
      
     document.getElementById("event-hook-35").style.display = 'none';
     document.getElementById("event-hook-35").parentElement.innerHTML = '<span style=font-size:28px>🧭</span>';
        ;
    });
  }
  const el_event_hook_36_error = document.getElementById('event-hook-36');
  if(el_event_hook_36_error) {
    el_event_hook_36_error.addEventListener('error', function(event) {
      document.getElementById("event-hook-36").parentElement.textContent = '🧭';
    });
  }
  const el_event_hook_37_click = document.getElementById('event-hook-37');
  if(el_event_hook_37_click) {
    el_event_hook_37_click.addEventListener('click', function(event) {
      musafirReset();
    });
  }
  const el_mai_voice_btn_click = document.getElementById('mai-voice-btn');
  if(el_mai_voice_btn_click) {
    el_mai_voice_btn_click.addEventListener('click', function(event) {
      musafirVoiceToggle();
    });
  }
  const el_event_hook_38_click = document.getElementById('event-hook-38');
  if(el_event_hook_38_click) {
    el_event_hook_38_click.addEventListener('click', function(event) {
      musafirToggle();
    });
  }
  const el_event_hook_39_click = document.getElementById('event-hook-39');
  if(el_event_hook_39_click) {
    el_event_hook_39_click.addEventListener('click', function(event) {
      musafirSuggest(document.getElementById("event-hook-39"));
    });
  }
  const el_event_hook_40_click = document.getElementById('event-hook-40');
  if(el_event_hook_40_click) {
    el_event_hook_40_click.addEventListener('click', function(event) {
      musafirSuggest(document.getElementById("event-hook-40"));
    });
  }
  const el_event_hook_41_click = document.getElementById('event-hook-41');
  if(el_event_hook_41_click) {
    el_event_hook_41_click.addEventListener('click', function(event) {
      musafirSuggest(document.getElementById("event-hook-41"));
    });
  }
  const el_event_hook_42_click = document.getElementById('event-hook-42');
  if(el_event_hook_42_click) {
    el_event_hook_42_click.addEventListener('click', function(event) {
      musafirSuggest(document.getElementById("event-hook-42"));
    });
  }
  const el_event_hook_43_click = document.getElementById('event-hook-43');
  if(el_event_hook_43_click) {
    el_event_hook_43_click.addEventListener('click', function(event) {
      musafirSuggest(document.getElementById("event-hook-43"));
    });
  }
  const el_event_hook_44_click = document.getElementById('event-hook-44');
  if(el_event_hook_44_click) {
    el_event_hook_44_click.addEventListener('click', function(event) {
      musafirSuggest(document.getElementById("event-hook-44"));
    });
  }
  const el_mai_input_keydown = document.getElementById('mai-input');
  if(el_mai_input_keydown) {
    el_mai_input_keydown.addEventListener('keydown', function(event) {
      musafirKey(event);
    });
  }
  const el_mai_input_input = document.getElementById('mai-input');
  if(el_mai_input_input) {
    el_mai_input_input.addEventListener('input', function(event) {
      musafirResize(document.getElementById("mai-input"));
    });
  }
  const el_event_hook_45_click = document.getElementById('event-hook-45');
  if(el_event_hook_45_click) {
    el_event_hook_45_click.addEventListener('click', function(event) {
      musafirSend();
    });
  }
});
