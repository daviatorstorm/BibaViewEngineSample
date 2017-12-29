using BibaViewEngine;
using BibaViewEngine.Attributes;

namespace BibaViewEngineTutorial.Client
{
    public class MyHeaderComponent : Component
    {
        [Input]
        public string Title { get; set; }
    }
}
