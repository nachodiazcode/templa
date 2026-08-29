import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TEMPLATES } from '../../core/data/templates.data';
import { TemplateItem } from '../../core/models/template.model';

type Goal = 'saas' | 'ecommerce' | 'portfolio' | 'blog' | 'agency' | 'education' | 'docs';
type Level = 'nocodigo' | 'algo' | 'pro';
type Budget = 'gratis' | 'medio' | 'alto';

const GOAL_LABELS: Record<Goal, string> = {
  saas: 'Un producto digital o SaaS',
  ecommerce: 'Una tienda online',
  portfolio: 'Mi portfolio o marca personal',
  blog: 'Un blog o medio de contenido',
  agency: 'Una agencia o estudio',
  education: 'Un curso o plataforma educativa',
  docs: 'Documentación técnica',
};

@Component({
  selector: 'app-match-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="quiz">
      <div class="head">
        <span class="kicker">Templa Match</span>
        <h3>Encuentra tu plantilla ideal en 30 segundos</h3>
        <p>Responde 3 preguntas y te recomendamos la perfecta para tu proyecto.</p>
      </div>

      @if (!showResult()) {
        <div class="steps">
          <div class="progress">
            <span class="on"></span><span [class.on]="step() >= 1"></span><span [class.on]="step() >= 2"></span>
          </div>

          @switch (step()) {
            @case (0) {
              <h4>¿Qué quieres crear?</h4>
              <div class="opts">
                @for (g of goals; track g.key) {
                  <button class="opt" (click)="setGoal(g.key)">
                    {{ GOAL_LABELS[g.key] }}
                  </button>
                }
              </div>
            }
            @case (1) {
              <h4>¿Cuál es tu nivel técnico?</h4>
              <div class="opts two">
                <button class="opt" (click)="setLevel('nocodigo')"><b>Sin código</b><small>Quiero editar textos e imágenes</small></button>
                <button class="opt" (click)="setLevel('algo')"><b>Algo de código</b><small>Puedo tocar HTML/CSS</small></button>
                <button class="opt" (click)="setLevel('pro')"><b>Dev pro</b><small>Angular, TypeScript, deploy</small></button>
              </div>
              <button class="back" (click)="step.set(0)">← Atrás</button>
            }
            @case (2) {
              <h4>¿Cuál es tu presupuesto?</h4>
              <div class="opts three">
                <button class="opt" (click)="setBudget('gratis')">Solo gratis</button>
                <button class="opt" (click)="setBudget('medio')">Hasta $60</button>
                <button class="opt" (click)="setBudget('alto')">Premium, sin límite</button>
              </div>
              <button class="back" (click)="step.set(1)">← Atrás</button>
            }
          }
        </div>
      } @else {
        <div class="result">
          @if (match(); as m) {
            <p class="tag">Tu match:</p>
            <div class="card" [style.--c1]="m.colors[0]" [style.--c2]="m.colors[1]">
              <div class="mini-preview"></div>
              <div class="info">
                <h4>{{ m.name }} · {{ m.price === 0 ? 'Gratis' : '$' + m.price }}</h4>
                <p>{{ m.tagline }}</p>
                <div class="meta">★ {{ m.rating }} · {{ m.pages }} páginas · {{ m.tech.join(' / ') }}</div>
              </div>
            </div>
            <div class="acts">
              <a [routerLink]="['/templates', m.id]" class="btn primary">Ver plantilla</a>
              <button class="btn ghost sm" (click)="reset()">Repetir test</button>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .quiz {
      background:
        radial-gradient(80% 120% at 100% 0%, rgba(34,211,238,.08), transparent 55%),
        radial-gradient(70% 110% at 0% 100%, rgba(139,92,246,.1), transparent 55%),
        var(--surface);
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 44px;
    }
    .head { text-align:center; margin-bottom: 30px;
      h3 { font-size: clamp(20px, 3vw, 27px); margin: 10px 0 6px; }
      p { color: var(--text-muted); margin: 0; font-size: 14.5px; }
    }
    .kicker { color: var(--accent-2); font-weight:800; text-transform:uppercase; letter-spacing:2px; font-size:12px; }
    .steps { max-width: 560px; margin: 0 auto; }
    .progress { display:flex; gap:8px; justify-content:center; margin-bottom: 26px;
      span { width:44px; height:4px; border-radius:99px; background: rgba(255,255,255,.09); transition:.3s; &.on { background: var(--grad); } }
    }
    h4 { text-align:center; margin:0 0 18px; font-size:17px; }
    .opts { display:grid; gap:10px; }
    .opts.two { grid-template-columns: repeat(3, 1fr); }
    .opts.three { grid-template-columns: repeat(3, 1fr); }
    .opt {
      background: rgba(255,255,255,.03); border:1px solid var(--border);
      color: var(--text); padding: 15px 16px; border-radius: 13px; cursor:pointer;
      font-size:14.5px; font-weight:600; transition: all .2s; text-align:center;
      b { display:block; margin-bottom:3px; }
      small { color: var(--text-faint); font-size:11.5px; font-weight:500; display:block; line-height:1.35; }
      &:hover { border-color: var(--accent); background: rgba(139,92,246,.08); transform: translateY(-2px); }
    }
    .back { margin-top:16px; background:none; border:none; color:var(--text-faint); cursor:pointer; font-size:13px; &:hover{color:var(--text)} }
    .result { text-align:center; }
    .tag { color: var(--success); font-weight:700; font-size:13px; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 14px; }
    .card {
      display:flex; gap:18px; align-items:center; text-align:left;
      background: var(--surface-2); border:1px solid var(--border-strong);
      padding:18px; border-radius:16px; max-width:520px; margin:0 auto;
    }
    .mini-preview {
      width:86px; height:64px; flex-shrink:0; border-radius:10px;
      background:
        radial-gradient(100% 90% at 90% -10%, color-mix(in srgb, var(--c2) 45%, transparent), transparent 60%),
        linear-gradient(135deg, var(--c1), #10121c);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.14);
    }
    .info {
      h4 { text-align:left; margin:0 0 4px; font-size:16px; }
      p { margin:0 0 6px; color:var(--text-muted); font-size:13px; }
      .meta { color:var(--text-faint); font-size:11.5px; font-weight:600; }
    }
    .acts { display:flex; gap:10px; justify-content:center; margin-top:22px; align-items:center; }
    @media (max-width: 720px) {
      .quiz { padding: 28px 20px; }
      .opts.two, .opts.three { grid-template-columns: 1fr; }
      .card { flex-direction: column; text-align:center; }
      .info h4 { text-align:center; }
    }
  `,
})
export class MatchQuizComponent {
  readonly GOAL_LABELS = GOAL_LABELS;
  readonly goals: { key: Goal }[] = [
    { key: 'saas' }, { key: 'ecommerce' }, { key: 'portfolio' }, { key: 'blog' },
    { key: 'agency' }, { key: 'education' }, { key: 'docs' },
  ];

  readonly step = signal(0);
  readonly showResult = signal(false);
  readonly goal = signal<Goal>('saas');
  readonly level = signal<Level>('pro');
  readonly budget = signal<Budget>('alto');

  readonly match = computed<TemplateItem | null>(() => {
    const catsByGoal: Record<Goal, TemplateItem['category'][]> = {
      saas: ['saas', 'landing', 'dashboard'],
      ecommerce: ['ecommerce', 'landing'],
      portfolio: ['portfolio', 'landing'],
      blog: ['blog', 'portfolio'],
      agency: ['agency', 'saas', 'portfolio'],
      education: ['education', 'landing', 'saas'],
      docs: ['documentation', 'saas'],
    };

    let pool = [...TEMPLATES];
    const cats = catsByGoal[this.goal()];
    const budget = this.budget();

    if (budget === 'gratis') {
      const free = pool.filter((t) => t.price === 0 && cats.includes(t.category));
      pool = free.length ? free : pool.filter((t) => t.price === 0);
    } else if (budget === 'medio') {
      const mid = pool.filter((t) => t.price > 0 && t.price <= 60 && cats.includes(t.category));
      pool = mid.length ? mid : pool.filter((t) => t.price <= 60);
    } else {
      const top = pool.filter((t) => cats.includes(t.category));
      pool = top.length ? top : pool;
    }

    // nivel técnico: nocodigo prefiere menos páginas, pro prefiere más features
    if (this.level() === 'nocodigo') {
      pool.sort((a, b) => a.pages - b.pages || b.rating - a.rating);
    } else {
      pool.sort((a, b) => b.features.length - a.features.length || b.rating - a.rating);
    }

    return pool[0] ?? null;
  });

  setGoal(g: Goal): void { this.goal.set(g); this.step.set(1); }
  setLevel(l: Level): void { this.level.set(l); this.step.set(2); }
  setBudget(b: Budget): void { this.budget.set(b); this.showResult.set(true); }

  reset(): void {
    this.step.set(0);
    this.showResult.set(false);
  }
}
