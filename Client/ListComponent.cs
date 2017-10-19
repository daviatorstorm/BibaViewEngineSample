using System.Collections.Generic;
using BibaViewEngine.Compiler;

namespace BibaViewEngine.Client {
    public class ListComponent : Component
    {
        public IEnumerable<string> Objects { get; set; } = new List<string> { "C#/.NET Core/.NET Framework", "Python/AI/ML/Bigdata", "R/Data Analizing" };
        public ListComponent(BibaCompiler bibaCompiler)
            : base(bibaCompiler)
        {
        }
    }
}